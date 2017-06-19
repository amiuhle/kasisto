/* eslint-env jest */

import * as actions from '../payments'

import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const { Date } = global

global.Date = jest.fn(() => new Date('2017-06-17T17:32:04.735Z'))

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'a2f8d724-5c7a-43e9-bbac-b0295b059e82')
}))

describe('Payment Actions', () => {
  describe('createPayment', () => {
    it('creates an action to create a payment', () => {
      const expectedAction = {
        type: actions.CREATE_PAYMENT,
        payload: {
          createdAt: '2017-06-17T17:32:04.735Z',
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          amount: 1.23,
          receipt: '070617/229-9',
          tip: 0,
          total: 1.23,
          updatedAt: '2017-06-17T17:32:04.735Z'
        }
      }
      expect(actions.createPayment(1.23, '070617/229-9'))
        .toEqual(expectedAction)
    })
  })

  describe('setTip', () => {
    it('creates an action to set the tip', () => {
      const expectedAction = {
        type: actions.SET_TIP,
        payload: {
          tip: 0.07,
          updatedAt: '2017-06-17T17:32:04.735Z'
        }
      }
      expect(actions.setTip(0.07))
        .toEqual(expectedAction)
    })
  })

  describe('fetchIntegratedAddress', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('fetches and returns an integrated address and payment id', () => {
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

      const expectedActions = [
        {
          type: actions.RECEIVE_INTEGRATED_ADDRESS,
          payload: {
            integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
            paymentId: '6b1887e13bbd81db'
          }
        }
      ]
      const store = mockStore([{
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        receipt: '070617/229-9',
        tip: 0,
        total: 1.23,
        updatedAt: '2017-06-17T17:32:04.735Z'
      }])

      return store.dispatch(actions.fetchIntegratedAddress()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('listenForPayments', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('polls and returns for matching transactions', () => {
      nock('https://testnet.kasisto.io:28082')
        .post('/json_rpc', {
          id: '0',
          jsonrpc: '2.0',
          method: 'get_transfers',
          params: {
            pool: true
          }
        }).reply(200, {
          id: '0',
          jsonrpc: '2.0',
          result: {
            pool: [{
              amount: 1300000000000,
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

      const expectedActions = [
        {
          type: actions.RECEIVE_PAYMENT,
          payload: {
            confirmed: false,
            received: 1.3,
            transactionIds: [
              '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b'
            ]
          }
        }
      ]
      const store = mockStore([{
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
        paymentId: '6b1887e13bbd81db',
        receipt: '070617/229-9',
        tip: 0.07,
        total: 1.3,
        updatedAt: '2017-06-17T17:32:04.735Z'
      }])

      jest.useFakeTimers()

      // TODO currently returning Promise for testability only
      store.dispatch(actions.listenForPayments(1.3, '6b1887e13bbd81db')).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
