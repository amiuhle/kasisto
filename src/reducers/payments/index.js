import { isToday } from 'date-fns'
import { combineReducers } from 'redux'

import byId, * as fromById from './byId'
import allIds, * as fromAllIds from './allIds'

export default combineReducers({
  byId,
  allIds
})

export const getPaymentById = (state, id) => fromById.getPayment(state.byId, id)

export const getAllPayments = (state) =>
  fromAllIds.getIds(state.allIds).map(id => fromById.getPayment(state.byId, id))

export const getTodaysLastPayment = (state) => {
  const id = fromAllIds.getIds(state.allIds).slice(0, 10).find((id, index) => {
    const payment = getPaymentById(state, id)
    console.log(index, payment.createdAt)
    return isToday(payment.createdAt)
  })
  return getPaymentById(state, id)
}
