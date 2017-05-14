/* eslint-env jest */

import React from 'react'
import AppComponent from '../App'
import renderer from 'react-test-renderer'
import * as mp from '../../lib/monero-payments'

it('experiments with Jest', () => {
  const Payment = mp.Payment = jest.fn(() => ({
    on: jest.fn()
  }))
  const Wallet = mp.WatchOnlyWallet = jest.fn(() => ({
    requestPayment: jest.fn(() => new Payment())
  }))

  const component = renderer.create(
    // {... { actions, payment }}
    <AppComponent />
  )
  let tree = component.toJSON()

  expect(Wallet).toBeCalledWith('testnet.kasisto.io', 28082, true)
  // expect(Payment.on).toBeCalledWith('ready')

  expect(tree).toMatchSnapshot()
})
