import React, { Component } from 'react'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import { history } from '../stores'

import PaymentRequest from './payments/payment-request'

export default class App extends Component {
  render () {
    const props = this.props
    return (
      <div className='o-app'>
        <h1 className='o-app__header u-margin-none'>Kasisto</h1>
        <aside className='o-app__nav' />
        <section className='o-app__content'>
          <ConnectedRouter history={history}>
            <Route render={({ match, location, history }) => (
              <PaymentRequest {...{match, location, history}} {...props} />
              )} />
          </ConnectedRouter>
        </section>
        <footer className='o-app__footer' />
      </div>
    )
  }
}
