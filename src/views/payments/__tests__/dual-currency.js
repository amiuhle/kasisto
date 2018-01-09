/* eslint-env jest */

import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import {
  reduxForm,
  reducer as formReducer
} from 'redux-form'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import DualCurrency from '../dual-currency'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('DualCurrency', () => {
  const createForm = reduxForm({
    form: 'dummy'
  })

  it('renders fiat and money', () => {
    const store = mockStore({
      form: formReducer,
      settings: {}
    })

    const Form = createForm(({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <DualCurrency />
      </form>
    ))
    const component = renderer.create(
      <Provider store={store}>
        <Form />
      </Provider>
    )

    let tree = component.toJSON()

    // expect(Payment.on).toBeCalledWith('ready')

    expect(tree).toMatchSnapshot()
  })
})
