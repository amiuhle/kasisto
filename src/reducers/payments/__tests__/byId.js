/* eslint-env jest */
import byId, { getPayment } from '../byId'
import {
  UPDATE_PAYMENT
} from '../../../actions/constants/payments'

describe('payments.byId Reducer', () => {
  it('creates a new payment', () => {
    const payload = {
      id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
      createdAt: '2017-06-17T17:32:04.735Z',
      updatedAt: '2017-06-17T17:32:04.735Z'
    }

    const state = byId({}, {
      type: UPDATE_PAYMENT,
      payload
    })

    expect(state).toEqual({
      'a2f8d724-5c7a-43e9-bbac-b0295b059e82': payload
    })
  })

  describe('getPayment', () => {
    it("returns a payment by it's id", () => {
      const payment = {
        id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        createdAt: '2017-06-17T17:32:04.735Z',
        updatedAt: '2017-06-17T17:32:04.735Z'
      }

      const state = {
        'a2f8d724-5c7a-43e9-bbac-b0295b059e82': payment
      }

      expect(getPayment(state, 'a2f8d724-5c7a-43e9-bbac-b0295b059e82'))
        .toEqual(payment)
    })
  })
})
