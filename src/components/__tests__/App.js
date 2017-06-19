/* eslint-env jest */

import React from 'react'
import AppComponent from '../App'
import renderer from 'react-test-renderer'

it('experiments with Jest', () => {
  const component = renderer.create(
    // {... { actions, payment }}
    <AppComponent />
  )
  let tree = component.toJSON()

  // expect(Payment.on).toBeCalledWith('ready')

  expect(tree).toMatchSnapshot()
})
