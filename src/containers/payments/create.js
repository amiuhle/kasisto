import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setAmount,
  setReceipt
} from '../../actions'

import {
  getPaymentById
} from '../../reducers'

import CreatePayment from '../../components/payments/create'

const render = props => <CreatePayment {...props} />

const mapStateToProps = (state, { match }) => ({
  payment: getPaymentById(state, match.params.id)
})

const mapDispatchToProps = (dispatch, { history, match }) => ({
  onRequestPayment (e) {
    e.preventDefault()
    history.push(`/payments/${match.params.id}/confirm`)
  },
  ...bindActionCreators({
    onSetAmount: setAmount,
    onSetReceipt: setReceipt
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
