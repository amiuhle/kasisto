/* eslint-env jest */

import * as actions from '../payments'
import * as types from '../constants/payments'

const noop = () => {}

const creationTime = '2017-06-17T17:30:00.000Z'
const createdAt = () => creationTime

describe('Payment Actions', () => {
  describe('requestPayment', () => {
    it('creates an action', () => {
      expect(actions.requestPayment(noop, noop, 3000))
        .toEqual({
          type: types.REQUEST_PAYMENT,
          payload: {
            resolve: noop,
            reject: noop
          }
        })
    })
  })

  describe('createPayment', () => {
    it('creates an action', () => {
      expect(actions.createPayment(
        'a2f8d724-5c7a-43e9-bbac-b0295b059e82', {
          fiatCurrency: 'EUR'
        }, createdAt)
      ).toEqual({
        type: types.CREATE_PAYMENT,
        payload: {
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          state: 'CREATED',
          fiatCurrency: 'EUR',
          createdAt: '2017-06-17T17:30:00.000Z',
          updatedAt: '2017-06-17T17:30:00.000Z'
        }
      })
    })
  })

  describe('setAmount', () => {
    it('creates an action', () => {
      expect(actions.setAmount('29.95', 'Receipt')).toEqual({
        type: types.SET_AMOUNT,
        payload: {
          requestedAmount: '29.95',
          receipt: 'Receipt'
        }
      })
    })

    it('accepts empty receipt', () => {
      expect(actions.setAmount('29.95')).toEqual({
        type: types.SET_AMOUNT,
        payload: {
          requestedAmount: '29.95',
          receipt: null
        }
      })
    })
  })

  describe('setTip', () => {
    it('creates an action', () => {
      expect(actions.setTip('3.00')).toEqual({
        type: types.SET_TIP,
        payload: {
          tip: 3
        }
      })
    })
  })

  describe('updatePayment', () => {
    it('creates an action', () => {
      expect(
        actions.updatePayment('a2f8d724-5c7a-43e9-bbac-b0295b059e82', {
          address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6',
          height: '1057120',
          paymentId: '6b1887e13bbd81db',
          rate: '315.84800377'
        }, createdAt)
      ).toEqual({
        type: types.UPDATE_PAYMENT,
        payload: {
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6',
          height: '1057120',
          paymentId: '6b1887e13bbd81db',
          rate: '315.84800377'
          // updatedAt: creationTime
        }
      })

      expect(
        actions.updatePayment('a2f8d724-5c7a-43e9-bbac-b0295b059e82', {
          requestedAmount: '49.95',
          convertedAmount: '0.158145688444',
          receipt: 'Receipt #12'
        }, createdAt)
      ).toEqual({
        type: types.UPDATE_PAYMENT,
        payload: {
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          requestedAmount: '49.95',
          convertedAmount: '0.158145688444',
          receipt: 'Receipt #12'
          // updatedAt: creationTime
        }
      })

      expect(
        actions.updatePayment('a2f8d724-5c7a-43e9-bbac-b0295b059e82', {
          uri: 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=0.158145688444&recipient_name=Barolo%20Beach%20Cafe&tx_description=Receipt%20%2312'
        }, createdAt)
      ).toEqual({
        type: types.UPDATE_PAYMENT,
        payload: {
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          uri: 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=0.158145688444&recipient_name=Barolo%20Beach%20Cafe&tx_description=Receipt%20%2312'
          // updatedAt: creationTime
        }
      })

      expect(
        actions.updatePayment('a2f8d724-5c7a-43e9-bbac-b0295b059e82', {
          uri: 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=0.173960257288&recipient_name=Barolo%20Beach%20Cafe&tx_description=Receipt%20%2312',
          tip: '0.015814568844'
        }, createdAt)
      ).toEqual({
        type: types.UPDATE_PAYMENT,
        payload: {
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          uri: 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=0.173960257288&recipient_name=Barolo%20Beach%20Cafe&tx_description=Receipt%20%2312',
          tip: '0.015814568844'
          // updatedAt: creationTime
        }
      })

      expect(
        actions.updatePayment('a2f8d724-5c7a-43e9-bbac-b0295b059e82', {
          receivedAmount: '0.158145688444'
        }, createdAt)
      ).toEqual({
        type: types.UPDATE_PAYMENT,
        payload: {
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          receivedAmount: '0.158145688444'
          // updatedAt: creationTime
        }
      })
    })
  })
})
