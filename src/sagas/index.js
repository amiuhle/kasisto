import { all } from 'redux-saga/effects'

import {
  watchCreatePayment
} from './payments'

import {
  watchExchangeRate
} from './settings'

export default function * rootSaga () {
  yield all([
    watchCreatePayment(),
    watchExchangeRate()
  ])
}
