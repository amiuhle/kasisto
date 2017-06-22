/* eslint-env jest */

import * as actions from '../payments'
import * as types from '../constants/payments'

import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const at = (timestamp, execute) => {
  const { Date } = global
  global.Date = jest.fn(() => new Date(timestamp))
  try {
    return execute()
  } finally {
    global.Date = Date
  }
}

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'a2f8d724-5c7a-43e9-bbac-b0295b059e82')
}))

describe('Payment Actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('Setup', () => {
    describe('startPayment', () => {
      beforeEach(() => {
        nock('https://api.kraken.com')
          .get('/0/public/Ticker?pair=xmreur,xmrusd')
          .reply(200, krakenReply)

        nock('https://testnet.kasisto.io:28082')
        .post('/json_rpc', {
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

      ;[
        { currency: 'EUR', rate: 46.68377619 },
        { currency: 'USD', rate: 50.95416569 }
      ].forEach(({ currency, rate }) => {
        const creationTime = '2017-06-17T17:30:00.000Z'
        it(`creates a new payment with ${currency}`, () => {
          const expectedActions = [
            {
              type: types.CREATE_PAYMENT,
              payload: {
                id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
                createdAt: creationTime,
                updatedAt: creationTime
              }
            },
            {
              type: types.RECEIVE_EXCHANGE_RATE,
              payload: {
                currency,
                rate
              }
            },
            {
              type: types.RECEIVE_INTEGRATED_ADDRESS,
              payload: {
                integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
                paymentId: '6b1887e13bbd81db'
              }
            }
          ]

          const store = mockStore()

          return at(creationTime, () => {
            return store.dispatch(actions.startPayment(currency)).then(() => {
              expect(store.getActions()).toEqual(expectedActions)
            })
          })
        })
      })
    })
  })

  describe('Seller actions', () => {
    describe('setReceipt', () => {
      it('creates an action to set receipt', () => {
        const expectedAction = {
          type: types.SET_RECEIPT,
          payload: {
            receipt: '070617/229-9',
            updatedAt: '2017-06-17T17:31:00.000Z'
          }
        }
        at('2017-06-17T17:31:00.000Z', () => {
          expect(actions.setReceipt('070617/229-9'))
            .toEqual(expectedAction)
        })
      })
    })

    describe('setAmount', () => {
      it('creates an action to set the payment amount', () => {
        const expectedAction = {
          type: types.SET_AMOUNT,
          payload: {
            amount: 1.23,
            updatedAt: '2017-06-17T17:32:00.000Z'
          }
        }
        at('2017-06-17T17:32:00.000Z', () => {
          expect(actions.setAmount(1.23))
            .toEqual(expectedAction)
        })
      })
    })
  })

  describe('Buyer actions', () => {
    describe('setTip', () => {
      it('creates an action to set the tip', () => {
        const expectedAction = {
          type: types.SET_TIP,
          payload: {
            tip: 0.07,
            updatedAt: '2017-06-17T17:32:04.735Z'
          }
        }
        at('2017-06-17T17:32:04.735Z', () => {
          expect(actions.setTip(0.07))
            .toEqual(expectedAction)
        })
      })
    })
  })

  describe('Payment Confirmation', () => {
    describe('listenForPayments', () => {
      afterEach(() => {
        nock.cleanAll()
      })

      // This currently doesn't do anything because it's not returning
      // the Promise from `dispatch`.
      // I haven't found out how to properly test it yet, though
      // it('polls and returns for matching transactions', () => {
      //   nock('https://testnet.kasisto.io:28082')
      //     .post('/json_rpc', {
      //       id: '0',
      //       jsonrpc: '2.0',
      //       method: 'get_transfers',
      //       params: {
      //         pool: true
      //       }
      //     }).reply(200, {
      //       id: '0',
      //       jsonrpc: '2.0',
      //       result: {
      //         pool: [{
      //           amount: 1300000000000,
      //           fee: 0,
      //           height: 0,
      //           note: '',
      //           payment_id: '6b1887e13bbd81db',
      //           timestamp: 1497782553,
      //           txid: '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b',
      //           type: 'pool'
      //         }]
      //       }
      //     })

      //   const expectedActions = [
      //     {
      //       type: types.RECEIVE_PAYMENT,
      //       payload: {
      //         confirmed: false,
      //         received: 1.3,
      //         transactionIds: [
      //           '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b'
      //         ]
      //       }
      //     }
      //   ]
      //   const store = mockStore([{
      //     amount: 1.23,
      //     createdAt: '2017-06-17T17:32:04.735Z',
      //     id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
      //     integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
      //     paymentId: '6b1887e13bbd81db',
      //     receipt: '070617/229-9',
      //     tip: 0.07,
      //     total: 1.3,
      //     updatedAt: '2017-06-17T17:32:04.735Z'
      //   }])

      //   jest.useFakeTimers()

      //   // TODO currently returning Promise for testability only
      //   store.dispatch(actions.listenForPayments(1.3, '6b1887e13bbd81db')).then(() => {
      //     expect(store.getActions()).toEqual(expectedActions)
      //   })
      // })
    })
  })
})

const krakenReply = {'error': [], 'result': {'XXMRZEUR': {'a': ['46.76598000', '1', '1.000'], 'b': ['46.20014000', '13', '13.000'], 'c': ['46.76600000', '5.10775692'], 'v': ['14064.64364194', '15592.81089719'], 'p': ['46.77169459', '46.68377619'], 't': [1771, 2067], 'l': ['44.60000000', '44.54476000'], 'h': ['48.20000000', '48.20000000'], 'o': '44.60592000'}, 'XXMRZUSD': {'a': ['52.29203000', '7', '7.000'], 'b': ['51.25448000', '71', '71.000'], 'c': ['52.29617000', '8.00000000'], 'v': ['5494.78936115', '11970.53392665'], 'p': ['51.56780353', '50.95416569'], 't': [733, 1237], 'l': ['50.27048000', '49.75228000'], 'h': ['53.79976000', '53.79976000'], 'o': '50.49875000'}}}
