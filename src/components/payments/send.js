import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class SendPayment extends Component {
  render () {
    if (this.props.payment == null) {
      return <Redirect to='/payments/create' />
    }
    const { total } = this.props.payment

    return (
      <div>
        <h2>Send Monero</h2>
        <p className='u-align-center'>
          Please send <br />
          <strong>{total} XMR</strong> <br />
          to the following address:
        </p>
      </div>
    )
  }
}
