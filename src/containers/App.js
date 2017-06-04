import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setAmount,
  setReceipt,
  setTip
} from '../actions/payments'

import App from '../components/App'

const render = props => {
  const { actions, payment } = props
  return <App {... { actions, payment }} />
}

const mapStateToProps = state => ({
  payment: state.payment
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setReceipt,
    setAmount,
    setTip
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
