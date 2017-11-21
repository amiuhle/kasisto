import { v4 as uuid } from 'uuid'

import Wallet from 'monero-nodejs'

import * as types from './constants/payments'

const { fetch } = window
const wallet = new Wallet('testnet.kasisto.io', 28082, true)

export const listenForPayments = (id, totalAmount, paymentId) => (dispatch) => {
  const poll = () => {
    return wallet.getTransfers({pool: true, in: true, pending: true}).then((result) => {
      const confirmed = result.in || []
      const pool = result.pool || []
      const pending = result.pending || []

      const transactions = confirmed.concat(pool).concat(pending)
        .filter(tx => tx.payment_id === paymentId)

      const received = transactions.reduce((sum, {amount}) => sum + amount, 0)

      if (received >= totalAmount * 1e12) {
        dispatch(receivePayment(id,
          false,
          received / 1e12,
          transactions.map(tx => tx.txid)
        ))
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

const receivePayment = (id, confirmed, received, transactionIds) => ({
  type: types.RECEIVE_PAYMENT,
  payload: {
    id,
    confirmed,
    received,
    transactionIds
  }
})

const fetchIntegratedAddress = (id) => (dispatch) =>
  wallet.makeIntegratedAddress().then(({integrated_address, payment_id}) =>
    dispatch(receiveIntegratedAddress(id, integrated_address, payment_id))
  )

const receiveIntegratedAddress = (id, integratedAddress, paymentId) => ({
  type: types.RECEIVE_INTEGRATED_ADDRESS,
  payload: {
    id,
    integratedAddress,
    paymentId
  }
})

export const fetchUri = (id, address, amount) => dispatch =>
  wallet.splitIntegratedAddress(address).then(({standard_address, payment_id}) =>
    wallet.makeUri(standard_address, Math.round(amount * 1e12), payment_id)
  ).then(({ uri }) => dispatch(receiveUri(id, uri)))

const receiveUri = (id, uri) => ({
  type: types.RECEIVE_URI,
  payload: {
    id,
    uri
  }
})

export const startPayment = (fiatCurrency) => (dispatch) => {
  const { id } = dispatch(createPayment()).payload
  return Promise.all([
    Promise.resolve(id),
    dispatch(fetchExchangeRate(id, fiatCurrency)),
    dispatch(fetchIntegratedAddress(id))
  ])
}

const createPayment = () => updatedAt({
  type: types.CREATE_PAYMENT,
  payload: {
    id: uuid(),
    createdAt: timestamp()
  }
})

export const setReceipt = (id, receipt) => updatedAt({
  type: types.SET_RECEIPT,
  payload: {
    id,
    receipt
  }
})

export const setAmount = (id, amount) => updatedAt({
  type: types.SET_AMOUNT,
  payload: {
    id,
    amount
  }
})

export const setTip = (id, tip) => {
  tip = Math.max(0, Number.parseFloat(tip) || 0)
  return updatedAt({
    type: types.SET_TIP,
    payload: {
      id,
      tip
    }
  })
}

const fetchExchangeRate = (id, fiatCurrency) => (dispatch) => {
  if (fiatCurrency === null) {
    dispatch(receiveExchangeRate(
      id,
      fiatCurrency,
      1
    ))
    return Promise.resolve()
  } else {
    return fetch('https://api.kraken.com/0/public/Ticker?pair=xmreur,xmrusd')
      .then(response => response.json())
      .then(json => dispatch(receiveExchangeRate(
        id,
        fiatCurrency,
        Number.parseFloat(json.result[`XXMRZ${fiatCurrency}`]['p'][1])
      )))
  }
}

const receiveExchangeRate = (id, fiatCurrency, rate) => ({
  type: types.RECEIVE_EXCHANGE_RATE,
  payload: {
    id,
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
