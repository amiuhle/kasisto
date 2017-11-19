// import { combineReducers } from 'redux'

import {
  CREATE_PAYMENT,
  SET_RECEIPT,
  SET_AMOUNT,
  SET_TIP,
  RECEIVE_EXCHANGE_RATE,
  RECEIVE_INTEGRATED_ADDRESS,
  RECEIVE_PAYMENT
} from '../actions/constants/payments'

const payment = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_PAYMENT: {
      const { id, createdAt, updatedAt } = payload
      return Object.assign({}, state, {
        id,
        createdAt,
        updatedAt
      })
    }
    case RECEIVE_EXCHANGE_RATE:
      const { rate, exchange, fiatCurrency } = payload
      return Object.assign({}, state, {
        rate,
        exchange,
        fiatCurrency
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

// const byId = (state = {}, action) => {
//   const { type, payload } = action
//   switch (type) {
//     case CREATE_PAYMENT:
//     case RECEIVE_EXCHANGE_RATE:
//     case SET_RECEIPT:
//     case SET_AMOUNT:
//     case SET_TIP:
//     case RECEIVE_INTEGRATED_ADDRESS:
//     case RECEIVE_PAYMENT:
//       return {
//         ...state,
//         [payload.id]: payment(state[payload.id], action)
//       }
//     default: {
//       return state
//     }
//   }
// }

const allIds = (state = [], { type, payload }) => {
  // console.log('allIds', state, type, payload)
  switch (type) {
    case CREATE_PAYMENT:
      return [payload.id, ...state]
    default:
      return state
  }
}

export default (state = {}, action) => {
  const nextIds = allIds(state.allIds, action)
  const currentPaymentId = getCurrentPaymentId(nextIds)
  return {
    allIds: nextIds,
    byId: {
      ...state.byId,
      [currentPaymentId]: currentPaymentId && payment(state.byId[currentPaymentId], action)
    }
  }
}

// export default combineReducers({
//   byId,
//   allIds
// })

const getCurrentPaymentId = (allIds) =>
  allIds.slice(0, 1)[0]

export const getCurrentPayment = (state) =>
  state.byId[getCurrentPaymentId(state.allIds)]

export const getAllPayments = (state) =>
  state.allIds.map(id => state.byId[id])
