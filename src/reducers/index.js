import { combineReducers } from 'redux'
import payments, * as fromPayments from './payments'

const reducers = {
  payments
}

export default combineReducers(reducers)

export const getAllPayments = (state) =>
  fromPayments.getAllPayments(state)

export const getPaymentById = (state, id) =>
  fromPayments.getPaymentById(state.payments, id)
