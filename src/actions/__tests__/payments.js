/* eslint-env jest */

import * as actions from '../payments'
import * as types from '../constants/payments'

const noop = () => {}

const creationTime = '2017-06-17T17:30:00.000Z'
const createdAt = () => creationTime

describe('Payment Actions', () => {
  describe('User Input', () => {
    describe('requestPayment', () => {
      it('allows the seller to trigger a new payment workflow', () => {
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

    describe('setAmount', () => {
      it('allows the seller to set amount and receipt', () => {
        expect(actions.setAmount('29.95', 'Receipt')).toEqual({
          type: types.SET_AMOUNT,
          payload: {
            requestedAmount: '29.95',
            receipt: 'Receipt'
          }
        })
      })

      it('accepts an empty receipt', () => {
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
      it('allows buyer to set a tip', () => {
        expect(actions.setTip('0.015814568844')).toEqual({
          type: types.SET_TIP,
          payload: {
            tip: '0.015814568844'
          }
        })
      })
    })

    describe('cancelPayment', () => {
      it('cancels a running payment request', () => {
        expect(actions.cancelPayment()).toEqual({
          type: types.CANCEL_PAYMENT
        })
      })
    })
  })

  describe('Saga Actions', () => {
    describe('createPayment', () => {
      it('creates a new payment model', () => {
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

    describe('networkInput', () => {
      it('sets required network info', () => {
        expect(actions.networkInput(
          'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6',
          'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
          '1057120',
          '6b1887e13bbd81db',
          '315.84800377'
        )).toEqual({
          type: types.UPDATE_PAYMENT,
          payload: {
            id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
            address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6',
            integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
            height: '1057120',
            paymentId: '6b1887e13bbd81db',
            rate: '315.84800377',
            state: 'NETWORK_INPUT'
            // updatedAt: creationTime
          }
        })
      })
    })

    describe('sellerInput', () => {
      it('sets required seller info', () => {
        expect(
          actions.sellerInput('a2f8d724-5c7a-43e9-bbac-b0295b059e82',
            '49.95',
            '0.158145688444'
          )
        ).toEqual({
          type: types.UPDATE_PAYMENT,
          payload: {
            id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
            requestedAmount: '49.95',
            convertedAmount: '0.158145688444',
            state: 'SELLER_INPUT'
            // updatedAt: creationTime
          }
        })
      })
    })

    describe('setUri', () => {
      it('updates the uri for the QR code', () => {
        expect(
          actions.setUri('a2f8d724-5c7a-43e9-bbac-b0295b059e82', 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=0.158145688444&recipient_name=Barolo%20Beach%20Cafe&tx_description=Receipt%20%2312')
        ).toEqual({
          type: types.UPDATE_PAYMENT,
          payload: {
            id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
            uri: 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=0.158145688444&recipient_name=Barolo%20Beach%20Cafe&tx_description=Receipt%20%2312',
            tip: null
            // updatedAt: creationTime
          }
        })
      })

      expect(
        actions.setUri('a2f8d724-5c7a-43e9-bbac-b0295b059e82', 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=0.173960257288&recipient_name=Barolo%20Beach%20Cafe&tx_description=Receipt%20%2312', '0.015814568844')
      ).toEqual({
        type: types.UPDATE_PAYMENT,
        payload: {
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          uri: 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=0.173960257288&recipient_name=Barolo%20Beach%20Cafe&tx_description=Receipt%20%2312',
          tip: '0.015814568844'
          // updatedAt: creationTime
        }
      })
    })

    describe('receivePayment', () => {
      it('finalizes the payment', () => {
        expect(
          actions.receivePayment('a2f8d724-5c7a-43e9-bbac-b0295b059e82', '0.158145688444')
        ).toEqual({
          type: types.UPDATE_PAYMENT,
          payload: {
            id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
            receivedAmount: '0.158145688444',
            state: 'PAYMENT_RECEIVED'
            // updatedAt: creationTime
          }
        })
      })
    })
  })
})
