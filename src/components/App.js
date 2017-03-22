import React, { Component, PropTypes } from 'react'

import QRCode from 'qrcode.react'

import {
  WatchOnlyWallet as Wallet
} from '../lib/monero-payments'

import './app.scss'

class PaymentRequest extends Component {
  constructor (props) {
    super(props)

    const relevant = ['amount', 'receipt', 'tip']

    this.state = relevant.reduce((state, prop) => {
      state[prop] = props[prop]
      return state
    }, {})

    relevant.forEach((prop) => {
      const capitalized = prop.charAt(0).toUpperCase() + prop.slice(1)
      this[`on${capitalized}Change`] = (e) => {
        console.log(`on${capitalized}Change`, prop, e)
        // debugger
        const state = {}
        state[prop] = e.target.value
        console.log('setState', state)
        this.setState(state)
      }
    })
  }

  get isMerchant () {
    return this.props.view === 'merchant'
  }

  get isClient () {
    return this.props.view === 'client'
  }

  get title () {
    return this.isMerchant ? 'Transaction details' : 'Payment due'
  }

  render () {
    const { isClient, isMerchant } = this
    const { amount, receipt, tip, setAmount, setReceipt, setTip, children } = this.props

    return (
      <div className='payment-request'>
        <h3>{this.title}</h3>
        {children}
        <label>
          <span>Receipt #</span>
          <input type='text' className='align-right' value={receipt} readOnly={isClient} onChange={setReceipt} />
        </label>
        <label>
          <span>Amount due</span>
          <input type='number' className='align-right' value={amount} readOnly={isClient} onChange={setAmount} />
        </label>
        <label>
          <span>Tip</span>
          <input type='number' className='align-right' value={tip} readOnly={isMerchant} onChange={setTip} />
        </label>
        <label>
          <span>Total</span>
          <input className='align-right' value={amount + tip} readOnly />
        </label>
      </div>
    )
  }
}

PaymentRequest.propTypes = {
  onAmountChange: PropTypes.func,
  onTipChange: PropTypes.func,
  view: PropTypes.oneOf(['client', 'merchant']).isRequired
}

const selectAll = (e) => {
  e.target.setSelectionRange(0, e.target.value.length)
}

class AppComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ready: false,
      amountReceived: 0,
      transactionIds: ['5d57c4cc534db0acb8169dff752600757c8e5bc117af61225175a3dab855a6af'],
      isRotated: false
    }

    this.wallet = new Wallet('testnet.kasisto.io', 28082, true)
    this.payment = this.wallet.requestPayment()
  }

  componentDidMount () {
    this.payment.on('ready', (integratedAddress, paymentId) => {
      this.setState({
        ready: true
      })
    })

    this.payment.on('payment', (event) => {
      console.log('onPayment', event, this.payment)
      this.setState({
        amountReceived: event.amount,
        transactionIds: event.transactionIds
      })
      const {actions: {setTip}, payment: {amount}} = this.props
      setTip((Math.round((event.amount - amount) * 1e12) / 1e12))
    })
  }

  render () {
    const { amountReceived, isRotated, ready, transactionIds } = this.state
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

    const paymentReceived = (
      <div className='payment-result'>
        <p className='success'>
          <span className='check'>✔</span>
          <strong>Payment received</strong>
        </p>
        <label>
          <span>Amount received</span>
          <input type='text' className='align-right' readOnly value={amountReceived} onFocus={selectAll} />
        </label>
        <p className='align-center'>Transaction Ids</p>
        <textarea className='integrated-address' value={transactionIds.join('\n')} readOnly onFocus={selectAll} />
      </div>
    )

    if (ready) {
      const { payment, actions } = this.props
      this.payment.amount = payment.amount

      return (
        <div className={`app ${isRotated ? 'flip' : ''}`}>
          <header>
            <h1 className={isRotated ? 'flip' : ''}>Kasisto</h1>
            <h2 className='flip'>{rotateButton(isRotated)} Merchant view</h2>
            <h2>{rotateButton(!isRotated)} Client view</h2>
          </header>
          <section className='merchant-view halves flip'>
            <PaymentRequest view='merchant' {... payment} {... actions} />
            <div className='flex flex--column'>
              <h3>Waiting for payment...</h3>
              {
                (() => {
                  if (amountReceived > 0) {
                    return paymentReceived
                  }
                })()
              }
            </div>
          </section>
          <section className='client-view halves'>
            <div>
              <PaymentRequest view='client' {... payment} {... actions} >
                <p>
                  <em><strong>Trinkejo</strong></em> is requesting a payment from you.
                </p>
              </PaymentRequest>
            </div>
            <div className='flex flex--column'>
              <h3>Send Monero</h3>
              {
                (() => {
                  if (amountReceived > 0) {
                    return paymentReceived
                  } else {
                    return (
                      <div className='payment-result'>
                        <a className='align-center qr-code'><QRCode value={`${uri}?tx_amount=${encodeURIComponent(payment.amount)}`} /></a>
                        <label>
                          <span>Please send</span>
                          <input type='text' className='align-right' readOnly value={payment.amount + payment.tip} onFocus={selectAll} />
                          <code>XMR</code>
                        </label>
                        <p className='align-center'>to the following integrated address</p>
                        <textarea className='integrated-address' value={integratedAddress} readOnly onFocus={selectAll} />
                      </div>
                    )
                  }
                })()
              }
            </div>
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
