import { v4 as uuid } from 'uuid'

export const CREATE_PAYMENT = 'CREATE_PAYMENT'
export const SET_TIP = 'SET_TIP'
export const CONFIRM_PAYMENT = 'CONFIRM_PAYMENT'

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
