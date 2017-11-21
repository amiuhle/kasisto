/* eslint-env jest */
import allIds, { getIds } from '../allIds'
import {
  CREATE_PAYMENT
} from '../../../actions/constants/payments'

describe('payments.allIds Reducer', () => {
  it('adds new payments', () => {
    const payload = {
      id: 'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
      createdAt: '2017-06-17T17:32:04.735Z',
      updatedAt: '2017-06-17T17:32:04.735Z'
    }

    const state = allIds(['payment 2', 'payment 1'], {
      type: CREATE_PAYMENT,
      payload
    })

    expect(state).toEqual([
      'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
      'payment 2',
      'payment 1'
    ])
  })

  describe('getIds', () => {
    it("returns a payment by it's id", () => {
      const state = [
        'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        'payment 2',
        'payment 1'
      ]

      expect(getIds(state)).toEqual([
        'a2f8d724-5c7a-43e9-bbac-b0295b059e82',
        'payment 2',
        'payment 1'
      ])
    })
  })
})
