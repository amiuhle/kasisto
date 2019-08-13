import * as types from './constants/payments'

const now = () => new Date().toISOString()

/**
 * Setup a new payment
 *
 * Called from dashboard, this triggers a new `processPayment` saga.
 *
 * @see processPayment
 * @param {Function} resolve Success callback
 * @param {Function} reject Error callback
 */
export const requestPayment = (resolve, reject) => ({
  type: types.REQUEST_PAYMENT,
  payload: {
    resolve,
    reject
  }
})

/**
 * Create a new payment model.
 *
 * Called by saga after creating new uuid.
 *
 * @param {String} id Payment identifier
 * @param {Object} payment Payment properties
 * @param {Date} timestamp The payment's creation date
 */
export const createPayment = (id, payment, timestamp = now) => ({
  type: types.CREATE_PAYMENT,
  payload: Object.assign({}, payment, { id },
    {
      state: 'CREATED',
      createdAt: timestamp(),
      updatedAt: timestamp()
    }
  )
})

/**
 * Set requested amount and an optional receipt reference.
 *
 * The amount is as requested by the seller. If a fiat currency is
 * configured in the settings, this value will be multiplied by
 * `exchangeRate`
 *
 * Called from create payment screen.
 *
 * @param {Big} requestedAmount Amount due, as requested by seller
 * @param {String} receipt An optional reference to a payment receipt
 */
export const setAmount = (requestedAmount, receipt = null) => ({
  type: types.SET_AMOUNT,
  payload: {
    requestedAmount,
    receipt
  }
})
/**
 * Set the tip amount. This is calculated by a percentage,
 * which can be configured in the settings.
 *
 * Called from send payment screen.
 *
 * @param {Big} tip Tip amount in XMR, as set by the buyer
 */
export const setTip = (tip) => {
  tip = Math.max(0, Number.parseFloat(tip) || 0)
  return {
    type: types.SET_TIP,
    payload: {
      tip: `${tip}`
    }
  }
}

/**
 * Set required network information in the model.
 *
 * Called by saga after polling Monero wallet and exchange rate.
 *
 * @param {String} id The payment id
 * @param {String} address Monero address
 * @param {String} integratedAddress Monero integrated address
 * @param {String} height Monero block height at beginning of payment process
 * @param {String} paymentId Monero payment id
 * @param {Big} rate fiat/XMR exchange rate
 */
export const networkInput = (id, address, integratedAddress, height, paymentId, rate) =>
  updatePayment(id, {
    address,
    integratedAddress,
    height,
    paymentId,
    rate,
    state: 'NETWORK_INPUT'
  })

/**
 * Set requested and converted amount in payment model.
 *
 * Called by saga after conversion is done.
 *
 * @param {String} id The payment id
 * @param {Big} requestedAmount Amount due, as requested by the seller
 * @param {Big} convertedAmount Amount due, converted
 */
export const sellerInput = (id, requestedAmount, convertedAmount) =>
  // TODO requestedAmount, receipt?
  updatePayment(id, {
    requestedAmount,
    convertedAmount,
    state: 'SELLER_INPUT'
  })

/**
 * Sets the URI to be encoded in a QR Code.
 *
 * Called by saga after buyer enters tip.
 *
 * @param {String} id The payment id
 * @param {String} uri The `monero:` payment uri for displaying a QR code
 */
export const setUri = (id, uri, tip = null) =>
  updatePayment(id, { uri, tip })

/**
 * Sets the amount received.
 *
 * Called by saga after polling wallet for incoming payments.
 *
 * @param {String} id The payment id
 * @param {Big} receivedAmount The amount received
 */
export const receivePayment = (id, receivedAmount) =>
  updatePayment(id, {
    receivedAmount,
    state: 'PAYMENT_RECEIVED'
  })

/**
 * Cancel a pending payment request.
 *
 * Called from send payment screen.
 */
export const cancelPayment = () => ({
  type: types.CANCEL_PAYMENT
})

const updatePayment = (id, payment, timestamp = now) => ({
  type: types.UPDATE_PAYMENT,
  payload: Object.assign({}, payment, { id },
    {
      // updatedAt: timestamp()
    }
  )
})
