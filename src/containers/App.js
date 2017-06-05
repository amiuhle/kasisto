import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createPayment
} from '../actions'

import App from '../components/App'

const render = props => {
  const { actions, payments } = props
  return <App {... { actions, payments }} />
}

const mapStateToProps = state => ({
  payments: state.payments
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createPayment
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
