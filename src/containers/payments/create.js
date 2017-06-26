import React from 'react'

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

export default connect(
  mapStateToProps,
  {
    onSetAmount: e => setAmount(e.target.value),
    onSetReceipt: e => setReceipt(e.target.value),
    onRequestPayment (e) {
      console.log('onRequestPayment')
      const { history } = this.props
      e.preventDefault()
      history.push('/payment/confirm')
    }
  }
)(render)
