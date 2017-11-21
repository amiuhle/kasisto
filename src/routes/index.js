import React from 'react'
import {
  HashRouter,
  Route
} from 'react-router-dom'

import App from '../components/App'
import Dashboard from '../containers/dashboard'
import Payments from './payments'

export default () => (
  <HashRouter>
    <App>
      <Route path='/' exact component={Dashboard} />
      <Payments />
    </App>
  </HashRouter>
)
