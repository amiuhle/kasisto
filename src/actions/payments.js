import { v4 as uuid } from 'uuid'

import Wallet from '../../src/lib/monero-payments'

const wallet = new Wallet('testnet.kasisto.io', 28082, true)

export const CREATE_PAYMENT = 'CREATE_PAYMENT'
export const SET_TIP = 'SET_TIP'
export const CONFIRM_PAYMENT = 'CONFIRM_PAYMENT'
export const RECEIVE_INTEGRATED_ADDRESS = 'RECEIVE_INTEGRATED_ADDRESS'
export const RECEIVE_PAYMENT = 'RECEIVE_PAYMENT'

export const listenForPayments = (total, paymentId) => (dispatch) => {
  // TODO validate total & paymentId
  const pool = []
  const poll = () => {
    wallet.proxyGetTransfers({pool: true}).then((result) => {
      const transactionIds = []
      const received = pool.reduce((amount, transaction) => {
        if (transaction.payment_id === paymentId) {
          amount += transaction.amount / 1e12
          transactionIds.push(transaction.txid)
        }
        return amount
      }, 0)

      if (received >= total) {
        dispatch(receivePayment({
          confirmed: false,
          received,
          transactionIds
        }))
        window.clearInterval(handle)
      }
      if (received > 0) {
        console.log('[PaymentRequest] transfers', received, result.pool)
      }
    })
  }
  // TODO clear handle?
  const handle = window.setInterval(poll, 10000)
}

const receivePayment = ({ confirmed, received, transactionIds }) => ({
  type: RECEIVE_PAYMENT,
  payload: {
    confirmed,
    received,
    transactionIds
  }
})

export const fetchIntegratedAddress = () => (dispatch) =>
  wallet.makeIntegratedAddress().then(
    result => dispatch(receiveIntegratedAddress(result))
  )

const receiveIntegratedAddress = ({ integrated_address, payment_id }) => ({
  type: RECEIVE_INTEGRATED_ADDRESS,
  payload: {
    integratedAddress: integrated_address,
    paymentId: payment_id
  }
})

export const createPayment = (amount, receipt) => {
  amount = Number.parseFloat(amount) || 0
  const total = amount
  return {
    type: CREATE_PAYMENT,
    payload: {
      id: uuid(),
      amount,
      receipt,
      tip: 0,
      total,
      createdAt: timestamp(),
      updatedAt: timestamp()
    }
  }
}

export const setTip = (tip) => {
  tip = Math.max(0, Number.parseFloat(tip) || 0)
  return {
    type: SET_TIP,
    payload: {
      tip,
      updatedAt: timestamp()
    }
  }
}

export const confirmPayment = () => ({
  type: CONFIRM_PAYMENT,
  payload: {

  }
})

const timestamp = () => {
  JSON.stringify(new Date())
}
