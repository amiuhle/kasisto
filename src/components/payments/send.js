import QRCode from 'qrcode.react'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import IntegratedAddress from '../monero/integrated-address'

export default class SendPayment extends Component {
  render () {
    if (this.props.payment == null) {
      return <Redirect to='/payments/create' />
    }
    const { total, integratedAddress } = this.props.payment

    const qrCode = `monero:${integratedAddress}?tx_amount=${encodeURIComponent(total)}`

    return (
      <div>
        <h2>Send Monero</h2>
        <p className='u-align-center'>
          Please send <br />
          <strong>{total} XMR</strong> <br />
          to the following address
        </p>
        {
          integratedAddress ? (
            <div className='o-flex o-flex--col'>
              <IntegratedAddress className='u-margin-bottom' integratedAddress={integratedAddress} />
              <div className='o-flex o-flex--center u-margin-bottom'>
                <QRCode size={192} value={qrCode} />
              </div>
            </div>
          ) : undefined
        }
        <div className='o-flex o-flex--center'>
          <Link to='/payment/confirm' className='c-btn'>Cancel payment</Link>
        </div>
      </div>
    )
  }
}
