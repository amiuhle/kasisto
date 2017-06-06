import { combineReducers } from 'redux'
import payments, * as fromPayments from './payments'

const reducers = {
  payments
}

export default combineReducers(reducers)

export const getCurrentPayment = (state) =>
  fromPayments.getCurrentPayment(state.payments)
