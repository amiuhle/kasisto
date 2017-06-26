import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Hint from '../settings/noob-hint'

export default class CreatePayment extends Component {
  render () {
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
            <input id='receipt' value={receipt} onChange={onSetReceipt} type='text' className='u-align-right' autoFocus />
          </p>
          <h3 className='u-margin-bottom-tiny'>
            <label htmlFor='amount'>Amount due</label>
          </h3>
          <p className='u-margin-bottom-tiny'>
            <input id='amount' value={requestedAmount} onChange={onSetAmount} type='number' step='.01' className='u-align-right' /><span>EUR</span>
          </p>
          <p className='u-margin-bottom'>
            <input id='amount' value={convertedAmount} disabled className='u-align-right' /><span>XMR</span>
          </p>
          <p className='u-margin-bottom'>
            <button className='c-btn' onClick={onRequestPayment}>Request payment</button>
          </p>
          <aside className='u-muted'>
            1 XMR = {rate} EUR <br />
            <a target='_blank' href={exchange}>{exchange}</a>
          </aside>
        </div>
      </div>
    )
  }

  static propTypes = {
    actions: PropTypes.shape({
      setAmount: PropTypes.func.isRequired,
      setReceipt: PropTypes.func.isRequired
    })
  }
}
