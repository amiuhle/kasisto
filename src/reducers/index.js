import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'

import payments, * as fromPayments from './payments'
import settings, * as fromSettings from './settings'

const reducers = {
  form: formReducer,
  payments,
  settings
}

export default combineReducers(reducers)

export const getAllPayments = (state) =>
  fromPayments.getAllPayments(state.payments)

export const getPaymentById = (state, id) =>
  fromPayments.getPaymentById(state.payments, id)

export const getTodaysLastPayment = (state) =>
  fromPayments.getTodaysLastPayment(state.payments)

export const getSettings = (state) =>
  fromSettings.getSettings(state.settings)
