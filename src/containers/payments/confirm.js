import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setTip
} from '../../actions'

import {
  getPaymentById
} from '../../reducers'

import ConfirmPayment from '../../components/payments/confirm'

const render = props => <ConfirmPayment {...props} />

const mapStateToProps = (state, ownProps) => ({
  payment: getPaymentById(state, ownProps.match.params.id)
})

const mapDispatchToProps = (dispatch, { history, match }) => ({
  onStartPayment (e) {
    e.preventDefault()
    history.push(`/payments/${match.params.id}/send`)
  },
  ...bindActionCreators({
    onSetTip: setTip
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
