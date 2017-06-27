import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

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
          <p className='u-margin-bottom'>
            <input
              disabled
              id='amount'
              value={convertedAmount}
              type='number'
              className='u-align-right'
            />
            <span>XMR</span>
          </p>

          <h3 className='u-margin-bottom-tiny'>
            <label htmlFor='tip'>Tip</label>
          </h3>
          <p className='u-margin-bottom'>
            <input
              id='tip'
              value={tip}
              onChange={onSetTip}
              type='number'
              className='u-align-right'
              autoFocus
              step={0.01}
            />
            <span>XMR</span>
          </p>

          <h3 className='u-margin-bottom-tiny'>
            <label htmlFor='totalAmount'>totalAmount</label>
          </h3>
          <p className='u-margin-bottom'>
            <input
              disabled
              id='totalAmount'
              value={totalAmount || undefined}
              type='number'
              className='u-align-right'
            />
            <span>XMR</span>
          </p>

          <p className='u-margin-bottom'>
            <button className='c-btn' onClick={onStartPayment}>
              Start payment
            </button>
          </p>
        </div>
      </div>
    )
  }
}
