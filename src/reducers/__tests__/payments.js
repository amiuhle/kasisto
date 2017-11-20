/* eslint-env jest */
import {
  CREATE_PAYMENT,
  SET_RECEIPT,
  SET_AMOUNT,
  SET_TIP,
  RECEIVE_EXCHANGE_RATE,
  RECEIVE_INTEGRATED_ADDRESS,
  RECEIVE_PAYMENT
} from '../../actions/constants/payments'

import payments, { getPaymentById } from '../payments'

describe('Payments Reducer', () => {
  const id = 'a2f8d724-5c7a-43e9-bbac-b0295b059e82'

  it('defaults to an empty list', () => {
    expect(
      payments(undefined, { type: '' })
    ).toEqual({
      byId: {},
      allIds: []
    })
  })

  describe(CREATE_PAYMENT, () => {
    it('adds a new payment', () => {
      const payload = {
        id,
        createdAt: '2017-06-17T17:32:04.735Z',
        updatedAt: '2017-06-17T17:32:04.735Z'
      }

      const state = payments(prevState, {
        type: CREATE_PAYMENT,
        payload
      })

      expect(state.allIds).toEqual([payload.id, ...prevIds])
      expect(state.byId[payload.id]).toEqual(payload)
    })
  })

  describe(RECEIVE_EXCHANGE_RATE, () => {
    it('sets exchange, fiatCurrency and rate', () => {
      const payload = {
        id,
        fiatCurrency: 'EUR',
        exchange: 'https://www.kraken.com/',
        rate: 46.68377619
      }
      const state = payments(preparePayments({
        id,
        createdAt: '2017-06-17T17:32:04.735Z',
        updatedAt: '2017-06-17T17:32:04.735Z'
      }), {
        type: RECEIVE_EXCHANGE_RATE,
        payload
      })

      expect(
        getPaymentById(state, id)
      ).toEqual({
        id,
        createdAt: '2017-06-17T17:32:04.735Z',
        updatedAt: '2017-06-17T17:32:04.735Z',

        fiatCurrency: 'EUR',
        exchange: 'https://www.kraken.com/',
        rate: 46.68377619
      })
    })
  })

  describe(SET_RECEIPT, () => {
    it('sets receipt', () => {
      const payload = {
        id,
        receipt: '070617/229-9'
      }
      const state = payments(preparePayments({
        id,
        createdAt: '2017-06-17T17:32:04.735Z',
        updatedAt: '2017-06-17T17:32:04.735Z',

        fiatCurrency: 'EUR',
        exchange: 'https://www.kraken.com/',
        rate: 46.68377619
      }), {
        type: SET_RECEIPT,
        payload
      })
      expect(
        getPaymentById(state, id)
      ).toEqual({
        id,
        createdAt: '2017-06-17T17:32:04.735Z',
        updatedAt: '2017-06-17T17:32:04.735Z',

        fiatCurrency: 'EUR',
        exchange: 'https://www.kraken.com/',
        rate: 46.68377619,

        receipt: '070617/229-9'
      })
    })
  })

  describe(SET_AMOUNT, () => {
    describe('for XMR', () => {
      it('sets amount', () => {
        const payload = {
          id,
          amount: 1.23
        }
        const state = payments(preparePayments({
          id,
          createdAt: '2017-06-17T17:32:04.735Z',
          updatedAt: '2017-06-17T17:32:04.735Z',

          fiatCurrency: null,
          exchange: null,
          rate: 1,

          receipt: '070617/229-9'
        }), {
          type: SET_AMOUNT,
          payload
        })
        expect(
          getPaymentById(state, id)
        ).toEqual({
          id,
          createdAt: '2017-06-17T17:32:04.735Z',
          updatedAt: '2017-06-17T17:32:04.735Z',

          fiatCurrency: null,
          exchange: null,
          rate: 1,

          receipt: '070617/229-9',

          requestedAmount: 1.23,
          convertedAmount: 1.23,

          tip: 0,
          totalAmount: 1.23
        })
      })
    })

    describe('for fiat currencies', () => {
      it('sets amount', () => {
        const payload = {
          id,
          amount: 49.90
        }
        const state = payments(preparePayments({
          id,
          createdAt: '2017-06-17T17:32:04.735Z',
          updatedAt: '2017-06-17T17:32:04.735Z',

          fiatCurrency: 'EUR',
          exchange: 'https://www.kraken.com/',
          rate: 46.68377619,

          receipt: '070617/229-9'
        }), {
          type: SET_AMOUNT,
          payload
        })
        expect(
          getPaymentById(state, id)
        ).toEqual({
          id,
          createdAt: '2017-06-17T17:32:04.735Z',
          updatedAt: '2017-06-17T17:32:04.735Z',

          fiatCurrency: 'EUR',
          exchange: 'https://www.kraken.com/',
          rate: 46.68377619,

          receipt: '070617/229-9',

          requestedAmount: 49.9,
          convertedAmount: 1.068893822918484,

          tip: 0,
          totalAmount: 1.068893822918484
        })
      })
    })
  })

  describe(SET_TIP, () => {
    it('sets tip', () => {
      const payload = {
        id,
        tip: 0.13110617708151606,
        updatedAt: '2017-06-17T17:41:14.353Z'
      }
      const state = payments(preparePayments({
        id,
        createdAt: '2017-06-17T17:32:04.735Z',
        updatedAt: '2017-06-17T17:41:14.353Z',

        fiatCurrency: 'EUR',
        exchange: 'https://www.kraken.com/',
        rate: 46.68377619,

        receipt: '070617/229-9',

        requestedAmount: 49.9,
        convertedAmount: 1.068893822918484
      }), {
        type: SET_TIP,
        payload
      })

      expect(getPaymentById(state, id)).toEqual({
        id,
        createdAt: '2017-06-17T17:32:04.735Z',
        updatedAt: '2017-06-17T17:41:14.353Z',

        fiatCurrency: 'EUR',
        exchange: 'https://www.kraken.com/',
        rate: 46.68377619,

        receipt: '070617/229-9',

        requestedAmount: 49.9,
        convertedAmount: 1.068893822918484,

        tip: 0.13110617708151606,
        totalAmount: 1.2
      })
    })
  })

  describe(RECEIVE_INTEGRATED_ADDRESS, () => {
    it('sets integrated address and payment id', () => {
      const payload = {
        id,
        integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
        paymentId: '6b1887e13bbd81db'
      }
      const state = payments(preparePayments({
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id,
        receipt: '070617/229-9',
        tip: 0,
        totalAmount: 1.23,
        updatedAt: '2017-06-17T17:32:04.735Z'
      }), {
        type: RECEIVE_INTEGRATED_ADDRESS,
        payload
      })

      expect(getPaymentById(state, id)).toEqual({
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id,
        integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
        paymentId: '6b1887e13bbd81db',
        receipt: '070617/229-9',
        tip: 0,
        totalAmount: 1.23,
        updatedAt: '2017-06-17T17:32:04.735Z'
      })
    })
  })

  describe(RECEIVE_PAYMENT, () => {
    it('sets amount received and transaction ids', () => {
      const payload = {
        id,
        confirmed: false,
        received: 1.3,
        transactionIds: [
          '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b'
        ]
      }
      const state = payments(preparePayments({
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id,
        integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
        paymentId: '6b1887e13bbd81db',
        receipt: '070617/229-9',
        tip: 0.07,
        totalAmount: 1.3,
        updatedAt: '2017-06-17T17:32:04.735Z'
      }), {
        type: RECEIVE_PAYMENT,
        payload
      })

      expect(getPaymentById(state, id)).toEqual({
        amount: 1.23,
        createdAt: '2017-06-17T17:32:04.735Z',
        id,
        integratedAddress: 'A3Brqw9sVmwLyWS8EWeUw1VqpqfwnDHTkG7Pb4NJ3RmZWeeMZhGMe2ZXz4bSk7BbtEYF5981nLxkDYQ6B46tX5DMVqg62UVmnbzRji2SB9',
        paymentId: '6b1887e13bbd81db',
        receipt: '070617/229-9',
        received: 1.3,
        tip: 0.07,
        totalAmount: 1.3,
        transactionIds: [
          '703b7eacf8f53016609671133f0584ba1cccb616ccdbafd49cc73fbba13a117b'
        ],
        updatedAt: '2017-06-17T17:32:04.735Z'
      })
    })
  })
})

const prevIds = ['payment 2', 'payment 1']

const prevState = {
  byId: {
    'payment 1': {},
    'payment 2': {}
  },
  allIds: prevIds
}

const preparePayments = (payment) => ({
  allIds: [payment.id, ...prevIds],
  byId: Object.assign({}, prevState.byId, {
    [payment.id]: payment
  })
})
