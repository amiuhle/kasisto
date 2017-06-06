import React from 'react'

import { connect } from 'react-redux'

import {
} from '../../actions'

import {
  getCurrentPayment
} from '../../reducers'

import SendPayment from '../../components/payments/send'

const render = props => {
  return <SendPayment {...props} />
}

const mapStateToProps = state => ({
  payment: getCurrentPayment(state)
})

export default connect(
  mapStateToProps,
  {
    // onConfirmPayment: confirmPayment,
    // onSetTip: setTip
  }
)(render)
