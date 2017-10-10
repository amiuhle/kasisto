import { combineReducers } from 'redux'
import payments, * as fromPayments from './payments'
import settings, * as fromSettings from './settings'

const reducers = {
  payments,
  settings
}

export default combineReducers(reducers)

export const getCurrentPayment = (state) =>
  fromPayments.getCurrentPayment(state.payments)

export const getHost = (state) =>
  fromSettings.getHost(state.settings)

export const getPort = (state) =>
  fromSettings.getPort(state.settings)
