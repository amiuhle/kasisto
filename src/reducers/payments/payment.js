import {
  UPDATE_PAYMENT
} from '../../actions/constants/payments'

const PAYMENT_KEYS = [
  'id',
  'createdAt',
  'fiatCurrency',
  'exchange',
  'address',
  'height',
  'paymentId',
  'rate',
  'receipt',
  'requestedAmount',
  'convertedAmount',
  'tip',
  'uri',
  'receivedAmount',
  'transactionIds',
  'updatedAt'
]

const validPaymentKey = (key) => PAYMENT_KEYS.indexOf(key) > -1

const filterProps = (payload) => {
  const payment = {}
  Object.keys(payload).forEach((key) => {
    const value = payload[key]
    if (value !== undefined && validPaymentKey(key)) {
      payment[key] = value
    }
  })
  return payment
}

const payment = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_PAYMENT: {
      return Object.assign({}, state, filterProps(payload))
    }
    default: {
      return state
    }
  }
}

export default payment
