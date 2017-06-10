import {
  CREATE_PAYMENT,
  CONFIRM_PAYMENT,
  SET_TIP,
  RECEIVE_INTEGRATED_ADDRESS,
  RECEIVE_PAYMENT
} from '../actions/payments'

// TODO This needs to be a more database-like structure
const payments = (state = [], action) => {
  const currentPayment = getCurrentPayment(state)
  const archive = state.slice(1)
  switch (action.type) {
    case CREATE_PAYMENT: {
      return [action.payload, ...state]
    }
    case CONFIRM_PAYMENT:
      // TODO CONFIRM_PAYMENT
      return state
    case SET_TIP: {
      const { tip } = action.payload
      return [
        Object.assign({}, currentPayment, {
          tip,
          total: currentPayment.amount + tip
        }),
        ...archive
      ]
    }
    case RECEIVE_INTEGRATED_ADDRESS: {
      const { integratedAddress, paymentId } = action.payload

      if (currentPayment.integratedAddress != null && currentPayment.paymentId != null) {
        // TODO could wallet have changed?
        return state
      }
      if (integratedAddress == null || paymentId == null) {
        // one is valid, one is null
        throw new Error(`Invalid state: ${JSON.stringify({integratedAddress, paymentId})}`)
      }

      return [
        Object.assign({}, currentPayment, {
          integratedAddress,
          paymentId
        }),
        ...archive
      ]
    }
    case RECEIVE_PAYMENT: {
      const { received, transactionIds } = action.payload
      console.log(RECEIVE_PAYMENT, received, transactionIds)
      return [
        Object.assign({}, currentPayment, {
          received,
          transactionIds
        }),
        ...archive
      ]
    }
    default: {
      return state
    }
  }
}

export default payments

export const getCurrentPayment = (state) =>
  state.slice(0, 1)[0]
