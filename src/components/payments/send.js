import QRCode from 'qrcode.react'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import {
  XMR,
  EUR

} from './utils'

import DualCurrency from './dual-currency'
import ExchangeInfo from './exchange-info'
import IntegratedAddress from '../monero/integrated-address'

export default class SendPayment extends Component {
  render () {
    if (this.props.payment == null) {
      return <Redirect to='/' />
    }
    const {
      integratedAddress,
      exchange,
      received,
      totalAmount,
      transactionIds,
      rate
    } = this.props.payment

    if (received != null && received >= totalAmount) {
      return (
        <div className='u-align-center'>
          <h2 className='c-success'>
            <span className='check'>✔</span>
            <strong>Payment received</strong>
          </h2>

          <h3 className='u-margin-bottom-tiny'>
            <label htmlFor='TODO'>Amount received</label>
          </h3>
          <DualCurrency
            from={XMR}
            to={EUR}
            fromAmount={received}
            toAmount={received * rate}
          />
          <p className='u-align-center'>Transaction Ids</p>
          <ul className='o-list-bare'>
            { transactionIds.map((txId, key) => <li key={key} style={{wordWrap: 'break-word'}}>{txId}</li>) }
          </ul>

          <ExchangeInfo rate={rate} exchange={exchange} className='u-margin-bottom' />

          <Link to='/' className='c-btn'>Home</Link>
        </div>
      )
    } else {
      const qrCode = `monero:${integratedAddress}?tx_amount=${encodeURIComponent(totalAmount)}`

      return (
        <div>
          <h2>Send Monero</h2>
          <div className='u-align-center'>
            Please send <br />
            <DualCurrency
              from={XMR}
              to={EUR}
              fromAmount={totalAmount}
              toAmount={totalAmount * rate}
            />
            to the following address
          </div>
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
