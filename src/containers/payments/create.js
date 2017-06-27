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

const render = props => {
  return <CreatePayment {...props} />
}

const mapStateToProps = state => ({
  payment: getCurrentPayment(state)
})

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  onSetAmount: e => setAmount(e.target.value),
  onSetReceipt: e => setReceipt(e.target.value),
  onRequestPayment (e) {
    console.log('onRequestPayment')
    const { history } = ownProps
    e.preventDefault()
    history.push('/payment/confirm')
  }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(render)
