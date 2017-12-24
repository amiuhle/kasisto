import {
  func,
  number,
  shape,
  string
} from 'prop-types'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form'

import { amountType } from './utils'

import DualCurrency from './dual-currency'
import ExchangeInfo from './exchange-info'

class CreatePayment extends Component {
  isReady = () => {
    const {
      address,
      height,
      paymentId,
      rate
    } = this.props.payment
    const { requestedAmount } = this.props
    console.log(requestedAmount)
    return !!(requestedAmount && address && height && paymentId && rate)
  }

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

    const isReady = this.isReady()

    return (
      <form onSubmit={handleSubmit}>
        <div className='o-content'>
          <h3 className='u-margin-bottom-none'>
            <label htmlFor='requestedAmount'>Amount due</label>
          </h3>

          <DualCurrency rate={rate} fiatCurrency={fiatCurrency} />
          <ExchangeInfo className='u-align-center' rate={rate} exchange={exchange} />

          <button className='c-btn' style={{width: '100%', marginTop: '300px', position: 'fixed', bottom: '0', borderRadius: '0'}} disabled={!isReady}>
            Request payment
          </button>
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

const createForm = reduxForm({
  form: 'createPayment'
})

export default createForm(CreatePayment)
