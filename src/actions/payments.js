import { v4 as uuid } from 'uuid'

export const CREATE_PAYMENT = 'CREATE_PAYMENT'

export const createPayment = (amount, receipt, tip) => ({
  type: CREATE_PAYMENT,
  payment: {
    id: uuid(),
    amount,
    receipt,
    tip,
    createdAt: timestamp(),
    updatedAt: timestamp()
  }
})

const timestamp = () => {
  JSON.stringify(new Date())
}
