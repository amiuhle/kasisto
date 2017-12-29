import camelCaseKeys from 'camelcase-keys'
import snakeCaseKeys from 'snakecase-keys'

const { fetch } = window

export const rawRpc = (url, method, params) => new Promise((resolve, reject) => {
  const body = {
    jsonrpc: '2.0',
    id: '0',
    method,
    params
  }
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        if (json && json.error) {
          reject(json.error)
        } else if (json && json.result) {
          resolve(json.result)
        } else {
          reject(json)
        }
      })
    } else {
      reject(response)
    }
  })
})

export const wrapRpc = (url, method, options = {}, mapOptions = snakeCaseKeys, mapResponse = camelCaseKeys) =>
  rawRpc(url, method, mapOptions(options)).then(mapResponse)

export const getAddress = (url) => rawRpc(url, 'getaddress')

export const getHeight = (url) => rawRpc(url, 'getheight')

export const makeIntegratedAddress = (url, options) =>
  wrapRpc(url, 'make_integrated_address', options)

export const makeUri = (url, options) =>
  wrapRpc(url, 'make_uri', options)

export const getTransfers = (url, options) =>
  wrapRpc(url, 'get_transfers', options)

const curryUrl = (fn, url) => (options) => fn(url, options)

export const connect = (url) => ({
  getAddress: curryUrl(getAddress, url),
  getHeight: curryUrl(getHeight, url),
  makeIntegratedAddress: curryUrl(makeIntegratedAddress, url),
  makeUri: curryUrl(makeUri, url),
  getTransfers: curryUrl(getTransfers, url)
})

export const requestPayment = (url, amount = null) => {
  const wallet = connect(url)
  const ready = Promise.all([
    wallet.getAddress(),
    wallet.makeIntegratedAddress(),
    wallet.getHeight()
  ]).then(([{ address }, { integratedAddress, paymentId }, { height }]) => {
    _address = address
    _integratedAddress = integratedAddress
    _paymentId = paymentId
    _height = height
    return payment
  })

  let cancel
  const onFulfilled = (pollingInterval = 5000) => new Promise((resolve, reject) => {
    cancel = () => {
      window.clearInterval(handle)
      reject(new Error('cancelled'))
    }
    const poll = () => {
      wallet.getTransfers({
        pool: true,
        in: true,
        pending: true,
        filterByHeight: true,
        minHeight: _height
      }).then((result) => {
        const confirmed = result.in || []
        const pool = result.pool || []
        const pending = result.pending || []

        const transactions = confirmed.concat(pool).concat(pending)
          .filter(tx => tx.payment_id === _paymentId)

        const received = transactions.reduce((sum, {amount}) => sum + amount, 0)

        if (received >= _amountRequested) {
          window.clearInterval(handle)
          _amountReceived = received
          _tip = _amountReceived - _amountRequested
          _transactions = transactions
          resolve(payment)
        }
      })
    }
    const handle = window.setInterval(poll, pollingInterval)
    poll()
  })

  let _address
  let _amountRequested = amount
  let _amountReceived
  let _integratedAddress
  let _height
  let _paymentId
  let _tip
  let _transactions

  const setAmount = (amount) => {
    if (_amountRequested != null) {
      throw new Error(`amount already set: ${_amountRequested}`)
    }
    _amountRequested = amount
    return payment
  }

  const makeUri = (tip = 0, recipientName, description) =>
    wallet.makeUri({
      address: _address,
      amount: _amountRequested + tip,
      paymentId: _paymentId,
      recipientName,
      txDescription: description
    })

  const payment = {
    get address () { return _address },
    get amountRequested () { return _amountRequested },
    get amountReceived () { return _amountReceived },
    get integratedAddress () { return _integratedAddress },
    get height () { return _height },
    get paymentId () { return _paymentId },
    get tip () { return _tip },
    get transactions () { return _transactions },

    setAmount,
    onFulfilled,
    makeUri,
    cancel
  }

  return ready
}
