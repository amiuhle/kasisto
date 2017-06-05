import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  confirmPayment
} from '../../actions'

import ConfirmPayment from '../../components/payments/confirm'

const render = props => {
  return <ConfirmPayment {...props} />
}

const mapStateToProps = state => ({
  payment: state.payments.slice(0, 1)[0]
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    confirmPayment
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
