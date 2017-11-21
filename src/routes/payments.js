import React from 'react'

import { Route, Switch } from 'react-router-dom'

import CreatePayment from '../containers/payments/create'
import ConfirmPayment from '../containers/payments/confirm'
import SendPayment from '../containers/payments/send'

export default () => (
  <Switch>
    <Route exact path='/payments/:id/create' component={CreatePayment} />
    <Route exact path='/payments/:id/confirm' component={ConfirmPayment} />
    <Route exact path='/payments/:id/send' component={SendPayment} />
  </Switch>
)
