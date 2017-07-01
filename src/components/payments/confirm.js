import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { XMR, EUR } from './utils'

import DualCurrency from './dual-currency'
import ExchangeInfo from './exchange-info'

export default class ConfirmPayment extends Component {
  render () {
    if (this.props.payment == null) {
      return <Redirect to='/' />
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
        <div>
          <h3 className='u-margin-bottom-none'>
            <label htmlFor='receipt'>Receipt</label>
          </h3>
          <div className='u-margin-bottom o-box--tiny'>
            {receipt}
          </div>

          <h3 className='u-margin-bottom-none'>
            Amount due
          </h3>
          <DualCurrency
            className='u-margin-bottom o-flex o-flex--col'
            primary={{
              amount: convertedAmount,
              currency: XMR
            }}
            secondary={{
              amount: requestedAmount,
              currency: EUR
            }}
          />

          <h3 className='u-margin-bottom-none'>
            <label htmlFor='tip'>Tip</label>
          </h3>
          <DualCurrency
            className='u-margin-bottom o-flex o-flex--col'
            id='tip'
            primary={{
              amount: tip,
              currency: XMR,
              onChange: onSetTip
            }}
            secondary={{
              amount: tip * rate,
              currency: EUR
            }}
          />

          <h3 className='u-margin-bottom-none'>
            <label htmlFor='totalAmount'>totalAmount</label>
          </h3>
          <DualCurrency
            className='u-margin-bottom o-flex o-flex--col'
            id='totalAmount'
            primary={{
              amount: totalAmount,
              currency: XMR
            }}
            secondary={{
              amount: totalAmount * rate,
              currency: EUR
            }}
          />

          <div className='u-margin-bottom o-flex o-flex--col'>
            <button className='c-btn' onClick={onStartPayment}>
              Start payment
            </button>
          </div>

          <ExchangeInfo className='u-align-center' rate={rate} exchange={exchange} />
        </div>
      </div>
    )
  }
}
