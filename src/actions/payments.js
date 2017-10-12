import { v4 as uuid } from 'uuid'

import Wallet from 'monero-nodejs'

import * as types from './constants/payments'

import { loadState } from '../lib/persistence'

const { fetch } = window

const state = loadState()

let { host, port } = (state || {}).settings || {}
if (!host) {
  host = 'testnet.kasisto.io'
}
if (!port) {
  port = '28082'
}
console.log('Connecting to', host, port)
const wallet = new Wallet(host, port, true)

export const listenForPayments = (totalAmount, paymentId) => (dispatch) => {
  const poll = () => {
    return wallet.getTransfers({pool: true, in: true, pending: true}).then((result) => {
      const confirmed = result.in || []
      const pool = result.pool || []
      const pending = result.pending || []

      const transactions = confirmed.concat(pool).concat(pending)
        .filter(tx => tx.payment_id === paymentId)

      const received = transactions.reduce((sum, {amount}) => sum + amount, 0)

      if (received >= totalAmount * 1e12) {
        dispatch(receivePayment({
          confirmed: false,
          received: received / 1e12,
          transactionIds: transactions.map(tx => tx.txid)
        }))
        window.clearInterval(handle)
      }
    })
  }
  const handle = window.setInterval(poll, 5000)
  // return the handle to the view so it can cancel polling
  return Promise.resolve(handle)
}

export const stopListeningForPayments = (handle) => (dispatch) =>
  Promise.resolve(window.clearInterval(handle))

const receivePayment = ({ confirmed, received, transactionIds }) => ({
  type: types.RECEIVE_PAYMENT,
  payload: {
    confirmed,
    received,
    transactionIds
  }
})

const fetchIntegratedAddress = () => (dispatch) =>
  wallet.makeIntegratedAddress().then(
    result => dispatch(receiveIntegratedAddress(result))
  )

const receiveIntegratedAddress = ({ integrated_address, payment_id }) => ({
  type: types.RECEIVE_INTEGRATED_ADDRESS,
  payload: {
    integratedAddress: integrated_address,
    paymentId: payment_id
  }
})

export const fetchUri = (address, amount) => dispatch =>
  wallet.splitIntegratedAddress(address).then(({standard_address, payment_id}) =>
    wallet.makeUri(standard_address, Math.round(amount * 1e12), payment_id)
  ).then(result => dispatch(receiveUri(result)))

const receiveUri = ({uri}) => ({
  type: types.RECEIVE_URI,
  payload: {
    uri
  }
})

export const startPayment = (fiatCurrency) => (dispatch) => {
  dispatch(createPayment())
  return Promise.all([
    dispatch(fetchExchangeRate(fiatCurrency)),
    dispatch(fetchIntegratedAddress())
  ])
}

const createPayment = () => updatedAt({
  type: types.CREATE_PAYMENT,
  payload: {
    id: uuid(),
    createdAt: timestamp()
  }
})

export const setReceipt = (receipt) => updatedAt({
  type: types.SET_RECEIPT,
  payload: {
    receipt
  }
})

export const setAmount = (amount) => updatedAt({
  type: types.SET_AMOUNT,
  payload: {
    amount
  }
})

export const setTip = (tip) => {
  tip = Math.max(0, Number.parseFloat(tip) || 0)
  return updatedAt({
    type: types.SET_TIP,
    payload: {
      tip
    }
  })
}

const fetchExchangeRate = (fiatCurrency) => (dispatch) => {
  if (fiatCurrency === null) {
    dispatch(receiveExchangeRate(
      fiatCurrency,
      1
    ))
    return Promise.resolve()
  } else {
    return fetch('https://api.kraken.com/0/public/Ticker?pair=xmreur,xmrusd')
      .then(response => response.json())
      .then(json => dispatch(receiveExchangeRate(
        fiatCurrency,
        Number.parseFloat(json.result[`XXMRZ${fiatCurrency}`]['p'][1])
      )))
  }
}

const receiveExchangeRate = (fiatCurrency, rate) => ({
  type: types.RECEIVE_EXCHANGE_RATE,
  payload: {
    fiatCurrency,
    rate,
    exchange: fiatCurrency === null ? null : 'https://www.kraken.com/'
  }
})

const updatedAt = (action) => ({
  ...action,
  payload: Object.assign(action.payload, { updatedAt: timestamp() })
})

const timestamp = () =>
  new Date().toISOString()
