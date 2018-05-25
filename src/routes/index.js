import React from 'react'
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom'

import AppLayout from '../views/layouts'

import Dashboard from '../containers/dashboard'
import Payments from './payments'
import Settings from '../containers/settings'

export default () => (
  <HashRouter>
    <AppLayout>
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/settings' exact component={Settings} />
        <Payments />
      </Switch>
    </AppLayout>
  </HashRouter>
)
