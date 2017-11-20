import {
  CREATE_PAYMENT,
  SET_RECEIPT,
  SET_AMOUNT,
  SET_TIP,
  RECEIVE_EXCHANGE_RATE,
  RECEIVE_INTEGRATED_ADDRESS,
  RECEIVE_PAYMENT
} from '../../actions/constants/payments'

import payment from './payment'

const byId = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_PAYMENT:
    case RECEIVE_EXCHANGE_RATE:
    case SET_RECEIPT:
    case SET_AMOUNT:
    case SET_TIP:
    case RECEIVE_INTEGRATED_ADDRESS:
    case RECEIVE_PAYMENT:
      return {
        ...state,
        [payload.id]: payment(state[payload.id], action)
      }
    default: {
      return state
    }
  }
}

export default byId

export const getPayment = (state, id) => state[id]
