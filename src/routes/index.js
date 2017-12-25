import React from 'react'
import {
  HashRouter,
  Route
} from 'react-router-dom'

import AppLayout from '../views/layouts'

import Dashboard from '../containers/dashboard'
import Payments from './payments'

export default () => (
  <HashRouter>
    <AppLayout>
      <Route path='/' exact component={Dashboard} />
      <Payments />
    </AppLayout>
  </HashRouter>
)
