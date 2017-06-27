import { v4 as uuid } from 'uuid'

import Wallet from 'monero-nodejs'

import * as types from './constants/payments'

const { fetch } = window
const wallet = new Wallet('testnet.kasisto.io', 28082, true)

export const listenForPayments = (totalAmount, paymentId) => (dispatch) => new Promise((resolve, reject) => {
  // TODO validate totalAmount & paymentId
  // const pool = []
  const poll = () => {
    wallet.getTransfers({pool: true}).then((result) => {
      const transactionIds = []
      const received = (result.pool || []).reduce((amount, transaction) => {
        if (transaction.payment_id === paymentId) {
          amount += transaction.amount / 1e12
          transactionIds.push(transaction.txid)
        }
        return amount
      }, 0)

      if (received >= totalAmount) {
        dispatch(receivePayment({
          confirmed: false,
          received,
          transactionIds
        }))
        window.clearInterval(handle)
        resolve()
      }
      if (received > 0) {
        console.log('[PaymentRequest] transfers', received, result.pool)
      }
    })
  }
  // TODO clear handle?
  const handle = window.setInterval(poll, 5000)
})

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

export const startPayment = (currency) => (dispatch) => {
  dispatch(createPayment())
  return Promise.all([
    dispatch(fetchExchangeRate(currency)),
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

const fetchExchangeRate = (currency) => (dispatch) => {
  if (currency === null) {
    dispatch(receiveExchangeRate(
      currency,
      1
    ))
    return Promise.resolve()
  } else {
    return fetch('https://api.kraken.com/0/public/Ticker?pair=xmreur,xmrusd')
      .then(response => response.json())
      .then(json => dispatch(receiveExchangeRate(
        currency,
        Number.parseFloat(json.result[`XXMRZ${currency}`]['p'][1])
      )))
  }
}

const receiveExchangeRate = (currency, rate) => ({
  type: types.RECEIVE_EXCHANGE_RATE,
  payload: {
    currency,
    rate,
    exchange: currency === null ? null : 'https://www.kraken.com/'
  }
})

const updatedAt = (action) => ({
  ...action,
  payload: Object.assign(action.payload, { updatedAt: timestamp() })
})

const timestamp = () =>
  new Date().toISOString()
