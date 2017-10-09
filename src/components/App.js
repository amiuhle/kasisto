import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Dashboard from '../containers/dashboard'
import CreatePayment from '../containers/payments/create'
import ConfirmPayment from '../containers/payments/confirm'
import SendPayment from '../containers/payments/send'

export default class App extends Component {
  render () {
    return (
      <div className='o-app'>
        <div className='o-app__header'>
          <h1 className='u-margin-none u-margin-left o-flex__stretch'>Kasisto</h1>
        </div>
        <aside className='o-app__nav' />
        <HashRouter>
          <section className='o-app__content'>
            <Route path='/' exact component={Dashboard} />
            <Route path='/payments/create' component={CreatePayment} />
            <Route path='/payment/confirm' component={ConfirmPayment} />
            <Route path='/payment/send' component={SendPayment} />
          </section>
        </HashRouter>
        <footer className='o-app__footer' />
      </div>
    )
  }
}
