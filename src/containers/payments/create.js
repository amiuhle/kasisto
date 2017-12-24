import React from 'react'

import { connect } from 'react-redux'

import {
  setAmount
} from '../../actions'

import {
  getPaymentById
} from '../../reducers'

import CreatePayment from '../../components/payments/create'

const render = props => <CreatePayment {...props} />

const mapStateToProps = (state, { match }) => ({
  payment: getPaymentById(state, match.params.id),
  requestedAmount: ((state.form.createPayment || {}).values || {}).requestedAmount
})

const mapDispatchToProps = (dispatch, { history, match }) => ({
  onSubmit ({ requestedAmount, receipt }) {
    dispatch(setAmount(requestedAmount, receipt))
    history.push(`/payments/${match.params.id}/send`)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
