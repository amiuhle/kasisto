import React, { Component } from 'react'

import QRCode from 'qrcode.react'

import {
  WatchOnlyWallet as Wallet
} from '../lib/monero-payments'

import './app.scss'

class AppComponent extends Component {

  constructor (props) {
    super(props)

    this.state = {
      ready: false,
      paymentReceived: false
    }

    this.wallet = new Wallet('207.154.197.71', 28082)
    this.payment = this.wallet.requestPayment()
  }

  componentDidMount () {
    this.payment.amount = 1.00 // XMR
    this.payment.on('ready', (integratedAddress, paymentId) => {
      this.setState({
        ready: true
      })
    })
    this.payment.on('payment', (event) => {
      this.setState({
        paymentReceived: true
      })
      console.log('onPayment', event, this.payment)
    })
  }

  render () {
    const { paymentReceived, ready } = this.state
    const { integratedAddress, uri } = this.payment

    if (ready) {
      return (
        <div className='app'>
          <p>
            Please pay <code>1 XMR</code> to the following <strong>testnet</strong> address:
          </p>
          <p>
            <QRCode value={uri} />
          </p>
          <textarea>{integratedAddress}</textarea>
          {
            (() => {
              if (paymentReceived) {
                return (
                  <p className='success'>
                    <span className='check'>✔</span>
                    <strong>Payment received</strong>
                  </p>
                )
              }
            })()
          }
        </div>
      )
    } else {
      return (
        <i>Waiting for wallet...</i>
      )
    }
  }
}

AppComponent.defaultProps = {
}

export default AppComponent
