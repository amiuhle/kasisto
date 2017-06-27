import {
  CREATE_PAYMENT,
  SET_RECEIPT,
  SET_AMOUNT,
  SET_TIP,
  RECEIVE_EXCHANGE_RATE,
  RECEIVE_INTEGRATED_ADDRESS,
  RECEIVE_PAYMENT
} from '../actions/constants/payments'

// TODO This needs to be a more database-like structure
const payments = (state = [], action) => {
  const { type, payload } = action

  const currentPayment = getCurrentPayment(state)
  const archive = state.slice(1)

  switch (type) {
    case CREATE_PAYMENT: {
      return [payload, ...state]
    }
    case RECEIVE_EXCHANGE_RATE:
    case SET_RECEIPT: {
      return [
        Object.assign({}, currentPayment, payload),
        ...archive
      ]
    }
    case SET_AMOUNT: {
      const { rate } = currentPayment
      const requestedAmount = payload.amount
      return [
        Object.assign({}, currentPayment, {
          requestedAmount,
          convertedAmount: requestedAmount / rate
        }),
        ...archive
      ]
    }
    case SET_TIP: {
      const { tip, updatedAt } = payload
      return [
        Object.assign({}, currentPayment, {
          tip,
          totalAmount: currentPayment.convertedAmount + tip,
          updatedAt
        }),
        ...archive
      ]
    }
    case RECEIVE_INTEGRATED_ADDRESS: {
      const { integratedAddress, paymentId } = payload

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
      const { received, transactionIds } = payload
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
