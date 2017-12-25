/* eslint-env jest */

import React from 'react'
import AppLayout from '../'

import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('experiments with Jest', () => {
  const store = mockStore()
  const component = renderer.create(
    // {... { actions, payment }}
    <Provider store={store}>
      <AppLayout />
    </Provider>
  )
  let tree = component.toJSON()

  // expect(Payment.on).toBeCalledWith('ready')

  expect(tree).toMatchSnapshot()
})
