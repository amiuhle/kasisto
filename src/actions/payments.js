import * as types from './constants/payments'

export const startPayment = (fiatCurrency, resolve, reject) => ({
  type: types.START_PAYMENT,
  payload: {
    fiatCurrency,
    url: 'https://testnet.kasisto.io:28082/json_rpc',
    resolve,
    reject
  }
})

export const createPayment = (id, fiatCurrency) => updatedAt({
  type: types.CREATE_PAYMENT,
  payload: {
    id,
    fiatCurrency,
    exchange: fiatCurrency === null ? null : 'https://www.kraken.com/',
    createdAt: timestamp()
  }
})

export const preparePayment = (id, address, height, paymentId, rate) => updatedAt({
  type: types.PREPARE_PAYMENT,
  payload: {
    id,
    address,
    height,
    paymentId,
    rate
  }
})

export const setAmount = (id, amount, receipt) => updatedAt({
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

export const updatePayment = (id, payment) => updatedAt({
  type: types.UPDATE_PAYMENT,
  payload: payment
})

const updatedAt = (action) => ({
  ...action,
  payload: Object.assign({}, action.payload, { updatedAt: timestamp() })
})

const timestamp = () =>
  new Date().toISOString()
