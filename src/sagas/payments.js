import Big from 'big.js'
import { v4 as uuid } from 'uuid'

import {
  all,
  call,
  put,
  take,
  takeEvery
} from 'redux-saga/effects'

import { requestPayment } from '../../lib/fetch-monero'

import {
  updatePayment
} from '../actions/payments'

import * as types from '../actions/constants/payments'

const { fetch } = window

export function * processPayment (action) {
  const {
    url,
    fiatCurrency,
    resolve
  } = action.payload

  const id = uuid()

  // create the initial payment in the store
  yield put(updatePayment(id, { fiatCurrency }))

  yield call(resolve, id)

  const [rate, paymentRequest] = yield all([
    call(fetchExchangeRate, fiatCurrency),
    call(requestPayment, url)
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

  const { uri } = yield call([paymentRequest, 'makeUri'], 0, 'Cafe', receipt)
  console.log(uri)

  yield put(updatePayment(id, { uri }))

  const onFulfilled = yield call([paymentRequest, 'onFulfilled'])

  yield put(updatePayment(id, { receivedAmount: new Big(onFulfilled.amountReceived).div(1e12).toFixed(12) }))

  const tip = yield takeEvery(types.SET_TIP)

  yield put(updatePayment(id, { tip }))
}

export function * watchCreatePayment () {
  yield takeEvery(types.REQUEST_PAYMENT, processPayment)
}

const fetchExchangeRate = (fiatCurrency) => {
  if (fiatCurrency === null) {
    return Promise.resolve(1)
  } else {
    return fetch('https://api.kraken.com/0/public/Ticker?pair=xmreur,xmrusd')
      .then(response => response.json())
      .then(json => Number.parseFloat(json.result[`XXMRZ${fiatCurrency}`]['p'][1]))
  }
}
