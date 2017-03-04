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
      paymentReceived: false,
      isRotated: false
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
    const { paymentReceived, ready, isRotated } = this.state
    const { integratedAddress, uri } = this.payment

    const rotateButton = (render) => {
      if (render) {
        return (
          <svg xmlns='http://www.w3.org/2000/svg' fill='#000000' viewBox='0 0 24 24' width='24' height='24' onClick={() => this.setState({ isRotated: !isRotated })}>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z' />
          </svg>
        )
      }
    }

    if (ready) {
      return (
        <div className={`app ${isRotated ? 'flip' : ''}`}>
          <section className='merchant-view flip'>
            <div className='payment-request'>
              <h3>Transaction details</h3>
              <label>
                <span>Receipt #</span>
                <input type='text' />
              </label>
              <label>
                <span>Amount</span>
                <input type='number' />
              </label>
            </div>
            <div className='payment-result'>
              <h3>Waiting for payment...</h3>
            </div>
          </section>
          <header>
            <h1 className={isRotated ? 'flip' : ''}>Kasisto</h1>
            <h2 className='flip'>{rotateButton(isRotated)} Merchant view</h2>
            <h2>{rotateButton(!isRotated)} Client view</h2>
          </header>
          <section className='client-view'>
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
          </section>
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
