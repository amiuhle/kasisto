import QRCode from 'qrcode.react'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import IntegratedAddress from '../monero/integrated-address'

export default class SendPayment extends Component {
  render () {
    if (this.props.payment == null) {
      return <Redirect to='/payments/create' />
    }
    const {
      integratedAddress,
      received,
      totalAmount,
      transactionIds
    } = this.props.payment

    if (received != null && received >= totalAmount) {
      return (
        <div className='o-flex o-flex--col o-flex--center'>
          <p className='c-success'>
            <span className='check'>✔</span>
            <strong>Payment received</strong>
          </p>
          <strong className='u-align-center'>{received} XMR</strong>
          <p className='u-align-center'>Transaction Ids</p>
          <ul className='o-list-bare'>
            { transactionIds.map((txId, key) => <li key={key} style={{wordWrap: 'break-word'}}>{txId}</li>) }
          </ul>
        </div>
      )
    } else {
      const qrCode = `monero:${integratedAddress}?tx_amount=${encodeURIComponent(totalAmount)}`

      return (
        <div>
          <h2>Send Monero</h2>
          <p className='u-align-center'>
            Please send <br />
            <strong>{totalAmount} XMR</strong> <br />
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
}
