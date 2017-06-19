/* eslint-env jest */
import {
  CREATE_PAYMENT,
  SET_TIP,
  RECEIVE_INTEGRATED_ADDRESS,
  RECEIVE_PAYMENT
 } from '../../actions/payments'
import payments from '../payments'

describe('Payments Reducer', () => {
  it('defaults to an empty list', () => {
    expect(
      payments(undefined, { type: '' })
    ).toEqual([])
  })

  describe(CREATE_PAYMENT, () => {
    it('adds a new payment', () => {
      const payload = {
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        receipt: '070617/229-9',
        tip: 0,
        total: 1.23,
        updatedAt: '2017-06-17T17:32:04.735Z'
      }

      expect(
        payments([], {
          type: CREATE_PAYMENT,
          payload
        })
      ).toEqual([payload])
    })
  })

  describe(SET_TIP, () => {
    it('sets tip and amount', () => {
      const payment = {
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        receipt: '070617/229-9',
        tip: 0,
        total: 1.23,
        updatedAt: '2017-06-17T17:32:04.735Z'
      }

      expect(
        payments([payment], {
          type: SET_TIP,
          payload: {
            tip: 0.07,
            updatedAt: '2017-06-17T17:41:14.353Z'
          }
        })
      ).toEqual([{
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        amount: 1.23,
        receipt: '070617/229-9',
        createdAt: '2017-06-17T17:32:04.735Z',
        updatedAt: '2017-06-17T17:41:14.353Z',
        tip: 0.07,
        total: 1.3
      }])
    })
  })

  describe(RECEIVE_INTEGRATED_ADDRESS, () => {
    it('sets integrated address and payment id', () => {
      const payment = {
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        receipt: '070617/229-9',
        tip: 0,
        total: 1.23,
        updatedAt: '2017-06-17T17:32:04.735Z'
      }
      expect(
        payments([payment], {
          type: RECEIVE_INTEGRATED_ADDRESS,
          payload: {
            integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
            paymentId: '6b1887e13bbd81db'
          }
        })
      ).toEqual([{
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
        paymentId: '6b1887e13bbd81db',
        receipt: '070617/229-9',
        tip: 0,
        total: 1.23,
        updatedAt: '2017-06-17T17:32:04.735Z'
      }])
    })
  })

  describe(RECEIVE_PAYMENT, () => {
    it('sets amount received and transaction ids', () => {
      const payment = {
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
        paymentId: '6b1887e13bbd81db',
        receipt: '070617/229-9',
        tip: 0.07,
        total: 1.3,
        updatedAt: '2017-06-17T17:32:04.735Z'
      }

      expect(
        payments([payment], {
          type: RECEIVE_PAYMENT,
          payload: {
            confirmed: false,
            received: 1.3,
            transactionIds: [
              '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b'
            ]
          }
        })
      ).toEqual([{
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
        paymentId: '6b1887e13bbd81db',
        receipt: '070617/229-9',
        received: 1.3,
        tip: 0.07,
        total: 1.3,
        transactionIds: [
          '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b'
        ],
        updatedAt: '2017-06-17T17:32:04.735Z'
      }])
    })
  })
})
