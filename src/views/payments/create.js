import {
  func,
  number,
  shape,
  string
} from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form'

import { amountType } from './utils'

import CancelPayment from '../../components/CancelPayment'

import DualCurrency from './dual-currency'

class CreatePayment extends Component {
  isReady = () => {
    const {
      address,
      height,
      paymentId,
      rate
    } = this.props.payment
    const { requestedAmount } = this.props
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
      <Fragment>
        <div className='o-app__content'>
          <form id='request-payment' onSubmit={handleSubmit}>
            <div className='o-content'>
              <h3 className='u-margin-bottom-none'>
                <label htmlFor='requestedAmount'>Amount due</label>
              </h3>
              <DualCurrency rate={rate} fiatCurrency={fiatCurrency} />
            </div>
          </form>
        </div>
        <CancelPayment />
        <button form='request-payment' className='o-app__footer c-btn' disabled={!isReady}>
          Request payment
        </button>
      </Fragment>
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
