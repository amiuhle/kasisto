import {
  all,
  call,
  put,
  take,
  takeEvery
} from 'redux-saga/effects'

import { v4 as uuid } from 'uuid'

import { requestPayment } from '../../lib/fetch-monero'

import {
  createPayment,
  preparePayment
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

  yield put(createPayment(id, fiatCurrency))

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

  yield put(preparePayment(id, address, height, paymentId, rate))

  const setAmount = yield take(types.SET_AMOUNT)
  const { amountRequested } = setAmount.payload

  paymentRequest.setAmount(amountRequested)
}

export function * watchCreatePayment () {
  yield takeEvery(types.START_PAYMENT, processPayment)
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
