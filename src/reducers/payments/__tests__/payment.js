/* eslint-env jest */
import {
  UPDATE_PAYMENT
} from '../../../actions/constants/payments'

import payment from '../payment'

describe('Payments Reducer', () => {
  it('defaults to an empty object', () => {
    expect(
      payment(undefined, { type: '' })
    ).toEqual({})
  })

  describe(UPDATE_PAYMENT, () => {
    it('updates all allowed keys', () => {
      const state = payment({}, {
        type: UPDATE_PAYMENT,
        payload: {
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          createdAt: '2017-06-17T17:32:04.735Z',
          fiatCurrency: 'EUR',
          exchange: 'https://www.kraken.com/',
          address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6',
          height: 1057120,
          paymentId: '6b1887e13bbd81db',
          rate: 46.68377619,
          receipt: '070617/229-9',
          requestedAmount: '49.9',
          convertedAmount: '1.068893822918',
          tip: '0.131106177081',
          uri: 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=1.068893822918',
          receivedAmount: '1.3',
          transactionIds: [
            '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b'
          ],
          updatedAt: '2017-06-17T17:32:04.735Z'
        }
      })

      expect(state).toEqual({
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        createdAt: '2017-06-17T17:32:04.735Z',
        fiatCurrency: 'EUR',
        exchange: 'https://www.kraken.com/',
        address: '9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6',
        height: 1057120,
        paymentId: '6b1887e13bbd81db',
        rate: 46.68377619,
        receipt: '070617/229-9',
        requestedAmount: '49.9',
        convertedAmount: '1.068893822918',
        tip: '0.131106177081',
        uri: 'monero:9sVBq8LNtWRLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMLRHQFh6?tx_payment_id=6b1887e13bbd81db&tx_amount=1.068893822918',
        receivedAmount: '1.3',
        transactionIds: [
          '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b'
        ],
        updatedAt: '2017-06-17T17:32:04.735Z'
      })
    })

    it('does not update invalid keys', () => {
      const state = payment({}, {
        type: UPDATE_PAYMENT,
        payload: {
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          unknown: 'key',
          foo: 'bar',
          to: 'the moon'
        }
      })

      expect(state).toEqual({
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82'
      })
    })

    it('does not update undefined values', () => {
      const state = payment({}, {
        type: UPDATE_PAYMENT,
        payload: {
          id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
          fiatCurrency: null,
          requestedAmount: undefined
        }
      })

      expect(state).toEqual({
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        fiatCurrency: null
      })
    })
  })
})
