import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  cancelPayment,
  setTip
} from '../../actions'

import {
  getPaymentById,
  getSettings
} from '../../reducers'

import SendPayment from '../../views/payments/send'

class Container extends Component {
  render () {
    return (
      <SendPayment {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  payment: getPaymentById(state, ownProps.match.params.id),
  settings: getSettings(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators({
    cancelPayment,
    setTip
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)
