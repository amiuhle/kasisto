import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setAmount,
  setReceipt,
  setTip
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
    setReceipt,
    setAmount,
    setTip
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
