import Big from 'big.js'
import QRCode from 'qrcode.react'
import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Icon from '../../components/Icon'
import CancelPayment from '../../components/CancelPayment'

import FiatRate from '../../components/FiatRate'

export default class SendPayment extends Component {
  state = {
    tipIndex: null
  }

  render () {
    if (this.props.payment == null) {
      return <Redirect to='/' />
    }
    const {
      setTip,
      settings,
      payment: {
        address,
        exchange,
        fiatCurrency,
        requestedAmount,
        receivedAmount,
        convertedAmount,
        tip,
        uri,
        rate
      }
    } = this.props

    const {
      tipIndex
    } = this.state

    const isTestnet = address != null && !address.startsWith('4')

    if (receivedAmount != null && new Big(receivedAmount).gte(new Big(convertedAmount))) {
      return (
        <Fragment>
          <div className='o-app__content c-success'>
            <Icon name='check' className='icon--large icon--white u-margin-bottom' />
            <h3 className='u-background u-medium'>Payment done</h3>

            <table className='c-payment-summary u-margin-bottom-large'>
              <tbody>
                <tr>
                  <th scope='row'>Amount</th>
                  <td>{requestedAmount}&nbsp;{fiatCurrency}</td>
                </tr>
                <tr>
                  <th scope='row'>Tip</th>
                  <td>{new Big(receivedAmount).times(rate).minus(requestedAmount).toFixed(2)}&nbsp;{fiatCurrency}</td>
                </tr>
                <tr>
                  <th scope='row'>Total</th>
                  <td>{new Big(receivedAmount).times(rate).toFixed(2)}&nbsp;{fiatCurrency}</td>
                </tr>
              </tbody>
            </table>
            <small>{new Big(receivedAmount).toFixed(12)} XMR</small>
          </div>
          <div className='o-app__top-left'>
            <Icon href='/' name='close' className='icon--white' />
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <div className='o-app__content o-content'>
            <h3 className='u-margin-bottom'>
              Add a tip?
            </h3>

            <ul className='o-list-inline c-tips'>
              {
                [0.15, 0.18, 0.20].map((tipRate, key) =>
                  <li
                    key={key}
                    onClick={(e) => {
                      e.preventDefault()
                      setTip(tipRate * convertedAmount)
                      this.setState({
                        tipIndex: key
                      })
                    }}
                    className='o-list-inline__item'>
                    <a href='#' className={`c-tips__tip ${key === tipIndex ? 'c-tips__tip--active' : 'bar'}`}>{tipRate * 100}%</a>
                  </li>
                )
              }
            </ul>

            <p>To {settings.name || 'Coffee shop'}</p>

            <table className='c-payment-summary u-margin-bottom-small'>
              <tbody>
                <tr>
                  <th scope='row'>Amount</th>
                  <td>{requestedAmount}&nbsp;{fiatCurrency}</td>
                </tr>
                <tr>
                  <th scope='row'>Tip</th>
                  <td>{new Big(tip || '0').times(rate).toFixed(2)}&nbsp;{fiatCurrency}</td>
                </tr>
                <tr>
                  <th scope='row'>Total</th>
                  <td>{new Big(requestedAmount).add(new Big(tip || '0').times(rate)).toFixed(2)}&nbsp;{fiatCurrency}</td>
                </tr>
              </tbody>
            </table>
            <small className='u-margin-bottom-large'>{new Big(convertedAmount).add(new Big(tip || '0')).toFixed(12)} XMR</small>

            <div className='o-flex o-flex--col'>
              <div className='o-flex o-flex--center u-margin-bottom'>
                {
                  uri && <QRCode size={192} value={uri} />
                }
              </div>
            </div>
            <FiatRate className='u-align-center' rate={rate} exchange={exchange} fiatCurrency={fiatCurrency} />
          </div>

          <CancelPayment />

          { isTestnet ? <small className='o-app__header u-brand-primary'>Testnet</small> : null }
        </Fragment>
      )
    }
  }
}
