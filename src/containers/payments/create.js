import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setAmount,
  setReceipt
} from '../../actions'

import {
  getCurrentPayment
} from '../../reducers'

import CreatePayment from '../../components/payments/create'

const render = props => <CreatePayment {...props} />

const mapStateToProps = state => ({
  payment: getCurrentPayment(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRequestPayment (e) {
    const { history } = ownProps
    e.preventDefault()
    history.push('/payment/confirm')
  },
  ...bindActionCreators({
    onSetAmount: setAmount,
    onSetReceipt: e => setReceipt(e.target.value)
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
