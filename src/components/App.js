import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Icon from './util/Icon'

import Dashboard from '../containers/dashboard'
import CreatePayment from '../containers/payments/create'
import ConfirmPayment from '../containers/payments/confirm'
import SendPayment from '../containers/payments/send'
import Settings from '../containers/settings'

export default class App extends Component {
  render () {
    return (
      <div className='o-app'>
        <div className='o-app__header'>
          <h1 className='u-margin-none u-margin-left o-flex__stretch'><a href='#/'>Kasisto</a></h1>
        </div>
        <aside className='o-app__nav u-align-center'>
          <Icon name='cog' href='#/settings' />
        </aside>
        <HashRouter>
          <section className='o-app__content'>
            <Route path='/' exact component={Dashboard} />
            <Route path='/payments/create' component={CreatePayment} />
            <Route path='/payment/confirm' component={ConfirmPayment} />
            <Route path='/payment/send' component={SendPayment} />

            <Route path='/settings' exact component={Settings} />
          </section>
        </HashRouter>
        <footer className='o-app__footer' />
      </div>
    )
  }
}
