import {
  CREATE_PAYMENT
} from '../actions/payments'

const payments = (state = [], action) => {
  switch (action.type) {
    case CREATE_PAYMENT: {
      return [action.payload, ...state]
    }
    default: {
      return state
    }
  }
}

export default payments
