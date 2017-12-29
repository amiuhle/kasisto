import * as types from './constants/payments'

export const startPayment = (fiatCurrency, resolve, reject) => ({
  type: types.REQUEST_PAYMENT,
  payload: {
    resolve,
    reject
  }
})

export const setAmount = (requestedAmount, receipt) => ({
  type: types.SET_AMOUNT,
  payload: {
    requestedAmount,
    receipt
  }
})

export const setTip = (tip) => {
  tip = Math.max(0, Number.parseFloat(tip) || 0)
  return {
    type: types.SET_TIP,
    payload: {
      tip
    }
  }
}

export const createPayment = (id, payment, timestamp = () => new Date().toISOString()) => ({
  type: types.CREATE_PAYMENT,
  payload: Object.assign({}, payment, { id },
    {
      createdAt: timestamp(),
      updatedAt: timestamp()
    }
  )
})

export const updatePayment = (id, payment, timestamp = () => new Date().toISOString()) => ({
  type: types.UPDATE_PAYMENT,
  payload: Object.assign({}, payment, { id },
    {
      // updatedAt: timestamp()
    }
  )
})
