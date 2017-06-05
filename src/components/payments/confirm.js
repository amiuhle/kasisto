import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class ConfirmPayment extends Component {
  state = {
    tip: 0
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const id = target.id

    this.setState({
      [id]: value
    })
  }

  handleSubmit = (e) => {
    const { tip } = this.state
    const { confirmPayment } = this.props.actions
    confirmPayment(tip)
  }

  render () {
    if (this.props.payment == null) {
      return <Redirect to='/payments/create' />
    }
    const { amount, receipt } = this.props.payment
    const { tip } = this.state
    return (
      <div>
        <h2>Create Payment</h2>
        <form action='/payment/pay' className='o-form' onSubmit={this.handleSubmit}>
          <label htmlFor='receipt'>Receipt</label>
          <input disabled id='receipt' value={receipt} onChange={this.handleInputChange} type='text' className='u-align-right' autoFocus />
          <label htmlFor='amount'>Amount due</label>
          <input disabled id='amount' value={amount} onChange={this.handleInputChange} type='number' className='u-align-right' />
          <label htmlFor='tip'>Tip</label>
          <input id='tip' value={tip} onChange={this.handleInputChange} type='number' className='u-align-right' autoFocus />
          <button className='o-form-item--span'>Start payment</button>
        </form>
      </div>
    )
  }
}
