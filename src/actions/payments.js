import { v4 as uuid } from 'uuid'

export const CREATE_PAYMENT = 'CREATE_PAYMENT'

export const createPayment = (amount, receipt) => ({
  type: CREATE_PAYMENT,
  payment: {
    id: uuid(),
    amount: Number.parseFloat(amount),
    receipt,
    createdAt: timestamp(),
    updatedAt: timestamp()
  }
})

const timestamp = () => {
  JSON.stringify(new Date())
}
