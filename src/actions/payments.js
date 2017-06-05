import { v4 as uuid } from 'uuid'

export const CREATE_PAYMENT = 'CREATE_PAYMENT'
export const CONFIRM_PAYMENT = 'CONFIRM_PAYMENT'

export const createPayment = (amount, receipt) => ({
  type: CREATE_PAYMENT,
  payload: {
    id: uuid(),
    amount: Number.parseFloat(amount),
    receipt,
    createdAt: timestamp(),
    updatedAt: timestamp()
  }
})

export const confirmPayment = (tip) => ({
  type: CONFIRM_PAYMENT,
  payload: {
    tip,
    updatedAt: timestamp()
  }
})

const timestamp = () => {
  JSON.stringify(new Date())
}
