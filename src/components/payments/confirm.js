import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class ConfirmPayment extends Component {
  state = {
    tip: '0.00'
  }

  handleSubmit = (e) => {
    const { history } = this.props
    e.preventDefault()
    history.push('/payment/send')
  }

  render () {
    if (this.props.payment == null) {
      return <Redirect to='/payments/create' />
    }
    const { convertedAmount, receipt, tip, total } = this.props.payment

    const { onSetTip } = this.props

    return (
      <div>
        <h2>Confirm Payment</h2>
        <form action='/payment/send' className='o-form' onSubmit={this.handleSubmit}>
          <label htmlFor='receipt'>Receipt</label>
          <input disabled id='receipt' value={receipt} type='text' className='u-align-right' />

          <label htmlFor='amount'>Amount due</label>
          <input disabled id='amount' value={convertedAmount} type='number' className='u-align-right' />

          <label htmlFor='tip'>Tip</label>
          <input id='tip' value={tip} onChange={e => { onSetTip(e.target.value) }} type='number' className='u-align-right' autoFocus step={0.01} />

          <label htmlFor='total'>Total</label>
          <input disabled id='total' value={total} type='number' className='u-align-right' />

          <button className='o-form-item--span'>Start payment</button>
        </form>
      </div>
    )
  }
}
