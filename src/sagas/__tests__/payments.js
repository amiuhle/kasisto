/* eslint-env jest */
import nock from 'nock'

import { all, call, put } from 'redux-saga/effects'

import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'

import {
  processPayment
} from '../payments'

import {
  startPayment
} from '../../actions/payments'

import * as types from '../../actions/constants/payments'

const at = (timestamp, execute) => {
  const { Date } = global
  global.Date = jest.fn(() => new Date(timestamp))
  try {
    return execute()
  } finally {
    global.Date = Date
  }
}

const URL_BASE = 'https://testnet.kasisto.io:28082'
const URL_PATH = '/json_rpc'
const URL = `${URL_BASE}${URL_PATH}`

const mockRequest = nock(URL_BASE)

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'a2f8d724-5c7a-43e9-bbac-b0295b059e82')
}))

describe('processPayment', () => {
  const creationTime = '2017-06-17T17:30:00.000Z'

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

  describe('for XMR', () => {
    it('creates a payment', () => {
      return at(creationTime, () => {
        const resolve = jest.fn()
        return expectSaga(processPayment, startPayment(null, resolve))
          .put({
            type: types.UPDATE_PAYMENT,
            payload: {
              id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
              createdAt: creationTime,
              updatedAt: creationTime
            }
          })
          .put({
            type: types.UPDATE_PAYMENT,
            payload: {
              id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
              address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6',
              paymentId: '6b1887e13bbd81db',
              height: 1057120,
              fiatCurrency: null,
              rate: 1,
              exchange: null,
              updatedAt: creationTime
            }
          })
          .run()
      })
    })
  })
})

// const krakenReply = {'error': [], 'result': {'XXMRZEUR': {'a': ['46.76598000', '1', '1.000'], 'b': ['46.20014000', '13', '13.000'], 'c': ['46.76600000', '5.10775692'], 'v': ['14064.64364194', '15592.81089719'], 'p': ['46.77169459', '46.68377619'], 't': [1771, 2067], 'l': ['44.60000000', '44.54476000'], 'h': ['48.20000000', '48.20000000'], 'o': '44.60592000'}, 'XXMRZUSD': {'a': ['52.29203000', '7', '7.000'], 'b': ['51.25448000', '71', '71.000'], 'c': ['52.29617000', '8.00000000'], 'v': ['5494.78936115', '11970.53392665'], 'p': ['51.56780353', '50.95416569'], 't': [733, 1237], 'l': ['50.27048000', '49.75228000'], 'h': ['53.79976000', '53.79976000'], 'o': '50.49875000'}}}
