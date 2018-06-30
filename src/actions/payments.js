import * as types from './constants/payments'

const now = () => new Date().toISOString()

/**
 * Setup a new payment
 * @param {Function} resolve Success callback
 * @param {Function} reject Error callback
 */
export const requestPayment = (resolve, reject) => ({
  type: types.REQUEST_PAYMENT,
  payload: {
    resolve,
    reject
  }
})

/**
 *
 * @param {String} id Payment identifier
 * @param {Object} payment Payment properties
 * @param {Date} timestamp The payment's creation date
 */
export const createPayment = (id, payment, timestamp = now) => ({
  type: types.CREATE_PAYMENT,
  payload: Object.assign({}, payment, { id },
    {
      state: 'CREATED',
      createdAt: timestamp(),
      updatedAt: timestamp()
    }
  )
})

export const setAmount = (requestedAmount, receipt = null) => ({
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

export const cancelPayment = () => ({
  type: types.CANCEL_PAYMENT
})

export const updatePayment = (id, payment, timestamp = () => now) => ({
  type: types.UPDATE_PAYMENT,
  payload: Object.assign({}, payment, { id },
    {
      // updatedAt: timestamp()
    }
  )
})
