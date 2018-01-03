/* eslint-env jest */

import nock from 'nock'

import {
  connect,
  requestPayment
} from '../fetch-monero'
import { setTimeout } from 'timers'

const URL_BASE = 'https://testnet.kasisto.io:28082'
const URL_PATH = '/json_rpc'
const URL = `${URL_BASE}${URL_PATH}`

const mockRequest = nock(URL_BASE)

describe('connect', () => {
  let wallet = null
  beforeEach(() => {
    wallet = connect(URL)
  })

  describe('getAddress', () => {
    beforeEach(() => {
      mockRequest.post(URL_PATH, {
        id: '0',
        jsonrpc: '2.0',
        method: 'getaddress'
      }).reply(200, {
        id: '0',
        jsonrpc: '2.0',
        result: {
          address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6'
        }
      })
    })

    it("returns the wallet's address", () =>
      wallet.getAddress().then(({ address }) =>
        expect(address).toBe(
          '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6'
        )))
  })

  describe('getHeight', () => {
    beforeEach(() => {
      mockRequest.post(URL_PATH, {
        id: '0',
        jsonrpc: '2.0',
        method: 'getheight'
      }).reply(200, {
        id: '0',
        jsonrpc: '2.0',
        result: {
          'height': 1057120
        }
      })
    })

    it('returns the current block height', () =>
      wallet.getHeight().then(({height}) =>
        expect(height).toBe(1057120)))
  })

  describe('makeIntegratedAddress', () => {
    beforeEach(() => {
      mockRequest.post(URL_PATH, {
        id: '0',
        jsonrpc: '2.0',
        method: 'make_integrated_address',
        params: {}
      }).reply(200, {
        id: '0',
        jsonrpc: '2.0',
        result: {
          integrated_address: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
          payment_id: '6b1887e13bbd81db'
        }
      })
    })

    it('returns an integrated address and a payment id', () =>
      wallet.makeIntegratedAddress().then(({ integratedAddress, paymentId }) => {
        expect(integratedAddress).toBe('A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9')
        expect(paymentId).toBe('6b1887e13bbd81db')
      }))
  })

  describe('makeUri', () => {
    beforeEach(() => {
      mockRequest.post(URL_PATH, {
        id: '0',
        jsonrpc: '2.0',
        method: 'make_uri',
        params: {
          address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6',
          amount: 1010000000000,
          payment_id: '6b1887e13bbd81db',
          recipient_name: 'Cafe',
          tx_description: 'Coffee'
        }
      }).reply(200, {
        id: '0',
        jsonrpc: '2.0',
        result: {
          uri: 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=1.010000000000&recipient_name=Cafe&tx_description=Coffee'
        }
      })
    })

    it('returns an URI', () =>
      wallet.makeUri({
        address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6',
        amount: 1010000000000,
        paymentId: '6b1887e13bbd81db',
        recipientName: 'Cafe',
        txDescription: 'Coffee'
      }).then(({ uri }) => {
        expect(uri).toBe('monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=1.010000000000&recipient_name=Cafe&tx_description=Coffee')
      }))
  })
})

describe('accept payment', () => {
  beforeEach(() => {
    mockRequest.post(URL_PATH, {
      id: '0',
      jsonrpc: '2.0',
      method: 'getaddress'
    }).reply(200, {
      id: '0',
      jsonrpc: '2.0',
      result: {
        address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6'
      }
    })
    mockRequest.post(URL_PATH, {
      id: '0',
      jsonrpc: '2.0',
      method: 'make_integrated_address',
      params: {}
    }).reply(200, {
      id: '0',
      jsonrpc: '2.0',
      result: {
        integrated_address: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
        payment_id: '6b1887e13bbd81db'
      }
    })
    mockRequest.post(URL_PATH, {
      id: '0',
      jsonrpc: '2.0',
      method: 'getheight'
    }).reply(200, {
      id: '0',
      jsonrpc: '2.0',
      result: {
        'height': 1057120
      }
    })
    mockRequest.post(URL_PATH, {
      id: '0',
      jsonrpc: '2.0',
      method: 'make_uri',
      params: {
        address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6',
        amount: 1010000000000,
        payment_id: '6b1887e13bbd81db',
        recipient_name: 'Cafe',
        tx_description: 'Coffee'
      }
    }).reply(200, {
      id: '0',
      jsonrpc: '2.0',
      result: {
        uri: 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=1.010000000000&recipient_name=Cafe&tx_description=Coffee'
      }
    })
  })

  it('creates an incoming payment', () => {
    return requestPayment(URL, 1e12).then(({ address, paymentId, integratedAddress, height }) => {
      expect(address).toEqual('9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6')
      expect(paymentId).toEqual('6b1887e13bbd81db')
      expect(integratedAddress).toEqual('A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9')
      expect(height).toEqual(1057120)
    })
  })

  it('fetches a barcode URI', () => {
    return requestPayment(URL, 1e12).then(({ makeUri }) => {
      return makeUri(1e10, 'Cafe', 'Coffee').then(({ uri }) =>
        expect(uri).toBe('monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=1.010000000000&recipient_name=Cafe&tx_description=Coffee'
      ))
    })
  })

  describe('onFulfilled', () => {
    beforeEach(() => {
      mockRequest.post(URL_PATH, {
        id: '0',
        jsonrpc: '2.0',
        method: 'get_transfers',
        params: {
          pool: true,
          in: true,
          pending: true,
          filter_by_height: true,
          min_height: 1057120
        }
      }).reply(200, {
        id: '0',
        jsonrpc: '2.0',
        result: {
          pool: [{
            amount: 1010000000000,
            fee: 0,
            height: 0,
            note: '',
            payment_id: '6b1887e13bbd81db',
            timestamp: 1497782553,
            txid: '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b',
            type: 'pool'
          }]
        }
      })
      mockRequest.post(URL_PATH, {
        id: '0',
        jsonrpc: '2.0',
        method: 'make_integrated_address',
        params: {}
      }).reply(200, {
        id: '0',
        jsonrpc: '2.0',
        result: {
          integrated_address: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
          payment_id: '6b1887e13bbd81db'
        }
      })
      mockRequest.post(URL_PATH, {
        id: '0',
        jsonrpc: '2.0',
        method: 'getaddress'
      }).reply(200, {
        id: '0',
        jsonrpc: '2.0',
        result: {
          address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6'
        }
      })
      mockRequest.post(URL_PATH, {
        id: '0',
        jsonrpc: '2.0',
        method: 'getheight'
      }).reply(200, {
        id: '0',
        jsonrpc: '2.0',
        result: {
          'height': 1057120
        }
      })
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('has a nice api', () => {
      return requestPayment(URL).then(
        payment => payment.setAmount(1e12)
      ).then(
        payment => payment.makeUri(1e10, 'Cafe', 'Coffee').then(({ uri }) => {
          expect(uri).toBe('monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=1.010000000000&recipient_name=Cafe&tx_description=Coffee')
          return payment
        })
      ).then(
        payment => payment.onFulfilled(100)
      ).then((payment) => {
        expect(payment.amountRequested).toBe(1000000000000)
        expect(payment.amountReceived).toBe(1010000000000)
        expect(payment.tip).toBe(10000000000)

        expect(payment.transactions).toEqual([{
          amount: 1010000000000,
          fee: 0,
          height: 0,
          note: '',
          payment_id: '6b1887e13bbd81db',
          timestamp: 1497782553,
          txid: '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b',
          type: 'pool'
        }])
      })
    })

    it('can be cancelled', () => {
      return requestPayment(URL, 1e12).then(({ onFulfilled, cancel }) => {
        onFulfilled().then(() => { throw new Error('Payment was not cancelled') })
        return new Promise((resolve) => {
          setTimeout(() => {
            cancel()
            resolve()
          }, 100)
        })
      })
    })

    it('resolves when the payment is complete', () => {
      return requestPayment(URL, 1e12, 0).then(({ onFulfilled, cancel }) =>
        onFulfilled(100).then((response) => {
          expect(response.amountRequested).toBe(1000000000000)
          expect(response.amountReceived).toBe(1010000000000)
          expect(response.tip).toBe(10000000000)

          expect(response.transactions).toEqual([{
            amount: 1010000000000,
            fee: 0,
            height: 0,
            note: '',
            payment_id: '6b1887e13bbd81db',
            timestamp: 1497782553,
            txid: '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b',
            type: 'pool'
          }])
        }))
    })
  })
})
