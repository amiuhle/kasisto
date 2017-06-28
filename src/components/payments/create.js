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
        <div className='u-align-center'>
          <h3 className='u-margin-bottom-tiny'>
            <label htmlFor='receipt'>Receipt</label>
          </h3>
          <Hint text='A hint so you can identify this payment later' />
          <p className='u-margin-bottom'>
            <input
              id='receipt'
              value={receipt || ''}
              onChange={onSetReceipt}
              type='text'
              className='u-align-right'
              autoFocus
            />
          </p>
          <h3 className='u-margin-bottom-tiny'>
            <label htmlFor='amount'>Amount due</label>
          </h3>
          <DualCurrency
            id='amount'
            from={EUR}
            to={XMR}
            fromAmount={requestedAmount}
            onSetFrom={onSetAmount}

            toAmount={convertedAmount}
          />
          <p className='u-margin-bottom'>
            <button className='c-btn' onClick={onRequestPayment}>
              Request payment
            </button>
          </p>
          <ExchangeInfo rate={rate} exchange={exchange} />
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
