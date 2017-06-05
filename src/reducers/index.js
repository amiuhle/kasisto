import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import payments from './payments'

const reducers = {
  payments,
  router: routerReducer
}

export default combineReducers(reducers)
