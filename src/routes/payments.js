import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Payments from '../containers/payments'
import CreatePayment from '../containers/payments/create'
import SendPayment from '../containers/payments/send'
import ShowPayment from '../containers/payments/show'

export default () => (
  <Switch>
    <Route exact path='/payments' component={Payments} />
    <Route exact path='/payments/:id/create' component={CreatePayment} />
    <Route exact path='/payments/:id/send' component={SendPayment} />
    <Route exact path='/payments/:id' component={ShowPayment} />
  </Switch>
)
