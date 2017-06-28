import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { XMR, EUR } from './utils'

import DualCurrency from './dual-currency'
import ExchangeInfo from './exchange-info'

export default class ConfirmPayment extends Component {
  render () {
    if (this.props.payment == null) {
      return <Redirect to='/payments/create' />
    }
    const {
      onSetTip,
      onStartPayment,
      payment: {
        exchange,
        rate,
        receipt,
        tip,
        requestedAmount,
        convertedAmount,
        totalAmount
      }
    } = this.props

    return (
      <div>
        <h2>Confirm Payment</h2>
        <div className='u-align-center'>
          <h3 className='u-margin-bottom-tiny'>
            <label htmlFor='receipt'>Receipt</label>
          </h3>
          <p className='u-margin-bottom'>
            <input
              disabled
              id='receipt'
              value={receipt}
              type='text'
              className='u-align-right'
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
            toAmount={convertedAmount}
          />

          <h3 className='u-margin-bottom-tiny'>
            <label htmlFor='tip'>Tip</label>
          </h3>
          <DualCurrency
            id='tip'
            from={XMR}
            to={EUR}
            fromAmount={tip}
            onSetFrom={onSetTip}
            toAmount={tip * rate}
          />

          <h3 className='u-margin-bottom-tiny'>
            <label htmlFor='totalAmount'>totalAmount</label>
          </h3>
          <DualCurrency
            id='totalAmount'
            from={XMR}
            to={EUR}
            fromAmount={totalAmount}
            toAmount={totalAmount * rate}
          />

          <p className='u-margin-bottom'>
            <button className='c-btn' onClick={onStartPayment}>
              Start payment
            </button>
          </p>

          <ExchangeInfo rate={rate} exchange={exchange} />
        </div>
      </div>
    )
  }
}
