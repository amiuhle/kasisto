import Big from 'big.js'
import { v4 as uuid } from 'uuid'

import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery
} from 'redux-saga/effects'

import { requestPayment } from '../../lib/fetch-monero'
import { fetchExchangeRate } from '../../lib/exchange-rates'

import {
  getSettings
} from '../reducers'

import {
  createPayment,
  updatePayment
} from '../actions/payments'

import * as types from '../actions/constants/payments'

function * listenForTip (id, paymentRequest, name, receipt) {
  while (true) {
    const setTip = yield take(types.SET_TIP)
    const { tip } = setTip.payload
    const convertedTip = parseInt(new Big(tip).times(1e12).round(), 10)
    const { uri } = yield call([paymentRequest, 'makeUri'], convertedTip, name, receipt)
    yield put(updatePayment(id, { tip, uri }))
  }
}

export function * processPayment (action) {
  const {
    resolve,
    pollingInterval
  } = action.payload

  const settings = yield select(getSettings)

  const walletUrl = settings.walletUrl || 'https://testnet.kasisto.io:28084/json_rpc'
  const fiatCurrency = settings.fiatCurrency || 'EUR'
  const merchantName = settings.name || 'Coffee shop'

  const id = uuid()

  // create the initial payment in the store
  yield put(createPayment(id, { fiatCurrency }))

  // let the view know the payment was created
  yield call(resolve, id)

  const [rate, paymentRequest] = yield all([
    call(fetchExchangeRate, fiatCurrency),
    call(requestPayment, walletUrl)
  ])

  const {
    address,
    height,
    paymentId
  } = paymentRequest

  yield put(updatePayment(id, { address, height, paymentId, rate }))

  const setAmount = yield take(types.SET_AMOUNT)

  const { requestedAmount, receipt } = setAmount.payload
  const convertedAmount = new Big(requestedAmount).times(1e12).div(rate).round()

  yield put(updatePayment(id, {
    requestedAmount,
    convertedAmount: convertedAmount.div(1e12).toFixed(12),
    receipt
  }))

  paymentRequest.setAmount(parseInt(convertedAmount, 10))

  const { uri } = yield call([paymentRequest, 'makeUri'], 0, merchantName, receipt)
  yield put(updatePayment(id, { uri }))

  const tipSaga = yield fork(listenForTip, id, paymentRequest, merchantName, receipt)

  const onFulfilled = yield call([paymentRequest, 'onFulfilled'], pollingInterval)
  yield put(updatePayment(id, { receivedAmount: new Big(onFulfilled.amountReceived).div(1e12).toFixed(12) }))

  tipSaga.cancel()
}

export function * watchCreatePayment () {
  yield takeEvery(types.REQUEST_PAYMENT, processPayment)
}
