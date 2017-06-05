import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { history } from '../stores'

import CreatePayment from '../containers/payments/create'

export default class App extends Component {
  render () {
    return (
      <div className='o-app'>
        <h1 className='o-app__header u-margin-none'>Kasisto</h1>
        <aside className='o-app__nav' />
        <BrowserRouter forceRefresh={false} history={history}>
          <section className='o-app__content'>
            <Route path='/' exact render={() => <Redirect to='/payments/create' />} />
            <Route path='/payments/create' component={CreatePayment} />
          </section>
        </BrowserRouter>
        <footer className='o-app__footer' />
      </div>
    )
  }
}
