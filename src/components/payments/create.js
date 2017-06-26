import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CreatePayment extends Component {
  handleSubmit = (e) => {
    const { history } = this.props
    e.preventDefault()
    history.push('/payment/confirm')
  }

  render () {
    const {
      amount,
      receipt,
      actions: {
        setAmount,
        setReceipt
      }
    } = this.props
    return (
      <div>
        <h2>Create Payment</h2>
        <form className='o-form' onSubmit={this.handleSubmit}>
          <label htmlFor='receipt'>Receipt</label>
          <input id='receipt' value={receipt} onChange={e => setReceipt(e.target.value)} type='text' className='u-align-right' autoFocus />
          <label htmlFor='amount'>Amount due</label>
          <input id='amount' value={amount} onChange={e => setAmount(e.target.value)} type='number' step='.01' className='u-align-right' />
          <button className='o-form-item--span'>Request payment</button>
        </form>
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
