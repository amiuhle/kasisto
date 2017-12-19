import {
  CREATE_PAYMENT,
  UPDATE_PAYMENT
} from '../../actions/constants/payments'

const payment = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_PAYMENT: {
      const { id, fiatCurrency, exchange, createdAt, updatedAt } = payload
      return Object.assign({}, state, {
        id,
        fiatCurrency,
        exchange,
        createdAt,
        updatedAt
      })
    }
    case PREPARE_PAYMENT:
      const {
        address,
        height,
        paymentId,
        rate,
        updatedAt
      } = payload
      return Object.assign({}, state, {
        address,
        height,
        paymentId,
        rate,
        updatedAt
      })
    case SET_RECEIPT:
      return Object.assign({}, state, { receipt: payload.receipt })
    case SET_AMOUNT: {
      const { rate } = state
      const requestedAmount = payload.amount
      const convertedAmount = requestedAmount / rate
      return Object.assign({}, state, {
        requestedAmount,
        convertedAmount,
        tip: 0,
        totalAmount: convertedAmount
      })
    }
    case SET_TIP: {
      const { tip, updatedAt } = payload
      return Object.assign({}, state, {
        tip,
        totalAmount: state.convertedAmount + tip,
        updatedAt
      })
    }
    case RECEIVE_INTEGRATED_ADDRESS: {
      const { integratedAddress, paymentId } = payload

      if (state.integratedAddress != null && state.paymentId != null) {
        // TODO could wallet have changed?
        return state
      }
      if (integratedAddress == null || paymentId == null) {
        // one is valid, one is null
        throw new Error(`Invalid state: ${JSON.stringify({integratedAddress, paymentId})}`)
      }

      return Object.assign({}, state, {
        integratedAddress,
        paymentId
      })
    }
    case RECEIVE_URI: {
      const { uri } = payload
      return Object.assign({}, state, {
        uri
      })
    }
    case RECEIVE_PAYMENT: {
      const { received, transactionIds } = payload
      return Object.assign({}, state, {
        received,
        transactionIds
      })
    }
    default: {
      return state
    }
  }
}

export default payment
