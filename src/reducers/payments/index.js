import { combineReducers } from 'redux'

import byId, * as fromById from './byId'
import allIds, * as fromAllIds from './allIds'

export default combineReducers({
  byId,
  allIds
})

export const getPaymentById = (state, id) => fromById.getPayment(state.byId, id)

export const getAllPayments = (state) =>
  fromAllIds.getIds(state.ids).map(id => fromById.getPayment(state.byId, id))
