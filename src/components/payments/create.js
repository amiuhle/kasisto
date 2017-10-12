import {
  func,
  number,
  shape,
  string
} from 'prop-types'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import {
  XMR,
  EUR,

  amountType
} from './utils'

import DualCurrency from './dual-currency'
import ExchangeInfo from './exchange-info'
import Hint from '../settings/noob-hint'

export default class CreatePayment extends Component {
  render () {
    if (this.props.payment == null) {
      return <Redirect to='/' />
    }
    const {
      onSetAmount,
      onSetReceipt,
      onRequestPayment,
      payment: {
        exchange,
        rate,
        receipt,
        requestedAmount,
        convertedAmount
      }
    } = this.props

    return (
      <div>
        <h2>Create Payment</h2>
        <div>
          {/* <h3 className='u-margin-bottom-none'>
            <label htmlFor='receipt'>Receipt</label>
          </h3>
          <div className='u-margin-bottom o-flex o-flex--col'>
            <input
              id='receipt'
              value={receipt || ''}
              onChange={onSetReceipt}
              type='text'
              autoFocus
            />
            <Hint text='A hint so you can identify this payment later' />
          </div> */}

          <h3 className='u-margin-bottom-none'>
            <label htmlFor='amount'>Amount due</label>
          </h3>
          <DualCurrency
            id='amount'
            className='u-margin-bottom o-flex o-flex--col'

            primary={{
              amount: requestedAmount,
              currency: EUR,
              onChange: onSetAmount
            }}

            secondary={{
              amount: convertedAmount,
              currency: XMR
            }}
          />

          <div className='u-margin-bottom o-flex o-flex--col'>
            <button className='c-btn' onClick={onRequestPayment}>
              Request payment
            </button>
          </div>

          <ExchangeInfo className='u-align-center' rate={rate} exchange={exchange} />
        </div>
      </div>
    )
  }

  static propTypes = {
    onSetAmount: func.isRequired,
    onSetReceipt: func.isRequired,
    onRequestPayment: func.isRequired,
    payment: shape({
      exchange: string,
      rate: number,
      receipt: string,
      requestedAmount: amountType,
      convertedAmount: amountType
    }).isRequired

  }
}
