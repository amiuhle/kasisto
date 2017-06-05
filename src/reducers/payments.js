import {
  CREATE_PAYMENT,
  SET_TIP,
  CONFIRM_PAYMENT
} from '../actions/payments'

const payments = (state = [], action) => {
  switch (action.type) {
    case CREATE_PAYMENT: {
      return [action.payload, ...state]
    }
    case SET_TIP: {
      const currentPayment = getCurrentPayment(state)
      const archive = state.slice(1)
      return [Object.assign({}, currentPayment, {
        tip: action.payload.tip,
        total: currentPayment.amount + action.payload.tip
      }), ...archive]
    }
    default: {
      return state
    }
  }
}

export default payments

export const getCurrentPayment = (state) =>
  state.slice(0, 1)[0]
