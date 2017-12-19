import {
  func,
  number,
  shape,
  string
} from 'prop-types'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import {
  XMR,
  EUR,

  amountType
} from './utils'

import DualCurrency from './dual-currency'
import ExchangeInfo from './exchange-info'
import Hint from '../settings/noob-hint'

class CreatePayment extends Component {
  render () {
    if (this.props.payment == null) {
      return <Redirect to='/' />
    }
    const {
      handleSubmit,
      payment: {
        exchange,
        fiatCurrency,
        rate
      }
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <h2>Create Payment</h2>
        <div>
          <h3 className='u-margin-bottom-none'>
            <label htmlFor='receipt'>Receipt</label>
          </h3>
          <div className='u-margin-bottom o-flex o-flex--col'>
            <Field name='receipt' component='input' type='text' />
            <Hint text='A hint so you can identify this payment later' />
          </div>

          <h3 className='u-margin-bottom-none'>
            <label htmlFor='amount'>Amount due</label>
          </h3>
          <Field
            name='requestedAmount'
            className='u-margin-bottom o-flex o-flex--col'
            rate={rate}
            fiatCurrency={fiatCurrency}
            component={DualCurrency}
          />

          <div className='u-margin-bottom o-flex o-flex--col'>
            <button className='c-btn'>
              Request payment
            </button>
          </div>

          <ExchangeInfo className='u-align-center' rate={rate} exchange={exchange} />
        </div>
      </form>
    )
  }

  static propTypes = {
    onSubmit: func.isRequired,
    payment: shape({
      exchange: string,
      rate: number,
      receipt: string,
      requestedAmount: amountType,
      convertedAmount: amountType
    }).isRequired
  }
}

export default reduxForm({
  form: 'createPayment'
})(CreatePayment)
