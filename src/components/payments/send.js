import Big from 'big.js'
import QRCode from 'qrcode.react'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Icon from '../util/Icon'

import ExchangeInfo from './exchange-info'

export default class SendPayment extends Component {
  render () {
    if (this.props.payment == null) {
      return <Redirect to='/' />
    }
    const {
      exchange,
      fiatCurrency,
      requestedAmount,
      receivedAmount,
      convertedAmount,
      tip,
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
        <div className='o-content'>
          <h3 className='u-margin-bottom'>
            Add a tip?
          </h3>

          <ul className='o-list-inline c-tips'>
            <li className='o-list-inline__item'><a href='#'>15%</a></li>
            <li className='o-list-inline__item'><a href='#'>18%</a></li>
            <li className='o-list-inline__item'><a href='#'>20%</a></li>
          </ul>

          <p>To Coffee shop</p>

          <table className='c-payment-summary u-margin-bottom-large'>
            <tr>
              <th scope='row'>Amount</th>
              <td>{requestedAmount}&nbsp;{fiatCurrency}</td>
            </tr>
            <tr>
              <th scope='row'>Tip</th>
              <td>{tip || '0'}&nbsp;{fiatCurrency}</td>
            </tr>
            <tr>
              <th scope='row'>Total</th>
              <td>{requestedAmount}&nbsp;{fiatCurrency}</td>
            </tr>
          </table>

          <div className='o-flex o-flex--col'>
            <div className='o-flex o-flex--center u-margin-bottom'>
              {
                uri && <QRCode size={192} value={uri} />
              }
            </div>
          </div>
          <small>
            <ExchangeInfo className='u-align-center' rate={rate} exchange={exchange} />
          </small>
        </div>
      )
    }
  }
}
