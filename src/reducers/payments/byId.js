import {
  CREATE_PAYMENT,
  UPDATE_PAYMENT
} from '../../actions/constants/payments'

import payment from './payment'

const byId = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_PAYMENT:
    case UPDATE_PAYMENT:
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
