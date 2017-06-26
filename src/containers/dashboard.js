import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  startPayment
} from '../actions'

import Dashboard from '../components/dashboard'

const render = props => {
  return <Dashboard {...props} />
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    startPayment
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(render)
