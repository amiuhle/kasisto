import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'

import payments, * as fromPayments from './payments'

const reducers = {
  form: formReducer,
  payments
}

export default combineReducers(reducers)

export const getAllPayments = (state) =>
  fromPayments.getAllPayments(state)

export const getPaymentById = (state, id) =>
  fromPayments.getPaymentById(state.payments, id)
