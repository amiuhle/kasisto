/* eslint-env jest */

import React from 'react'
import DualCurrency from '../dual-currency'
import renderer from 'react-test-renderer'

describe('DualCurrency', () => {
  it('renders fiat and money', () => {
    const component = renderer.create(
      <DualCurrency />
    )

    let tree = component.toJSON()

    // expect(Payment.on).toBeCalledWith('ready')

    expect(tree).toMatchSnapshot()
  })
})
