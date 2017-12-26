import {
  call,
  put,
  takeEvery
} from 'redux-saga/effects'

import { fetchExchangeRate } from '../../lib/exchange-rates'

import * as types from '../actions/constants/settings'

import {
  saveSettings
} from '../actions/settings'

function * exchangeRate (action) {
  const fiatCurrency = action.payload
  const exchangeRate = yield call(fetchExchangeRate, fiatCurrency)
  yield put(saveSettings({ exchangeRate }))
}

export function * watchExchangeRate () {
  yield takeEvery(types.FETCH_EXCHANGE_RATE, exchangeRate)
}
