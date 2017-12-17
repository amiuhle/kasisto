import { all } from 'redux-saga/effects'

import {
  watchCreatePayment
} from './payments'

export default function * rootSaga () {
  yield all([
    watchCreatePayment()
  ])
}
