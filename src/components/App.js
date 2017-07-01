import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { history } from '../stores'

import Dashboard from '../containers/dashboard'
import CreatePayment from '../containers/payments/create'
import ConfirmPayment from '../containers/payments/confirm'
import SendPayment from '../containers/payments/send'

export default class App extends Component {
  render () {
    return (
      <div className='o-app'>
        <div className='o-app__header'>
          <h1 className='u-margin-none u-margin-left'>Kasisto</h1>
        </div>
        <aside className='o-app__nav' />
        <BrowserRouter forceRefresh={false} history={history}>
          <section className='o-app__content'>
            <Route path='/' exact component={Dashboard} />
            <Route path='/payments/create' component={CreatePayment} />
            <Route path='/payment/confirm' component={ConfirmPayment} />
            <Route path='/payment/send' component={SendPayment} />
          </section>
        </BrowserRouter>
        <footer className='o-app__footer' />
      </div>
    )
  }
}
