import Big from 'big.js'
import QRCode from 'qrcode.react'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import {
  XMR,
  EUR
} from './utils'

import Icon from '../util/Icon'

import DualCurrency from './dual-currency'
import ExchangeInfo from './exchange-info'
import IntegratedAddress from '../monero/integrated-address'

export default class SendPayment extends Component {
  render () {
    if (this.props.payment == null) {
      return <Redirect to='/' />
    }
    const {
      id,
      address,
      exchange,
      receivedAmount,
      convertedAmount,
      transactionIds,
      uri,
      rate
    } = this.props.payment

    if (receivedAmount != null && new Big(receivedAmount).gte(new Big(convertedAmount))) {
      return (
        <div className='u-align-center'>
          <h2 className='c-success'>
            <Icon name='check-circle' className='icon--large' />
            <strong>Payment received</strong>
          </h2>

          <h3 className='u-margin-bottom-none'>
            <label htmlFor='TODO'>Amount received</label>
          </h3>
          {/* <DualCurrency
            className='u-margin-bottom o-flex o-flex--col'
            primary={{
              amount: received * rate,
              currency: EUR
            }}
            secondary={{
              amount: received,
              currency: XMR
            }}
          /> */}
          <p className='u-align-center'>Transaction Ids</p>
          <ul className='o-list-bare'>
            { (transactionIds || []).map((txId, key) => <li key={key} style={{wordWrap: 'break-word'}}><small>{txId}</small></li>) }
          </ul>

          <div className='u-margin-bottom o-flex o-flex--col'>
            <Link to='/' className='c-btn'>Done</Link>
          </div>

          <ExchangeInfo rate={rate} exchange={exchange} className='u-margin-bottom' />
        </div>
      )
    } else {
      return (
        <div>
          <h2>Waiting for payment</h2>
          <div>
            <h3 className='u-margin-bottom-none'>
              Total Amount
            </h3>
            {/* <DualCurrency
              className='u-margin-bottom o-flex o-flex--col'
              primary={{
                amount: totalAmount,
                currency: XMR
              }}
              secondary={{
                amount: totalAmount * rate,
                currency: EUR
              }}
            /> */}
            <div className='o-flex o-flex--col'>
              <div className='o-flex o-flex--center u-margin-bottom'>
                {
                  uri && <QRCode size={192} value={uri} />
                }
              </div>
              <h3 className='u-margin-bottom-none'>
                Integrated address
              </h3>
              <IntegratedAddress className='u-margin-bottom' integratedAddress={address} />
            </div>
            <div className='u-margin-bottom o-flex o-flex--col'>
              <Link to={`/payments/${id}/confirm`} className='c-btn'>Cancel payment</Link>
            </div>

            <ExchangeInfo className='u-align-center' rate={rate} exchange={exchange} />
          </div>
        </div>
      )
    }
  }
}
