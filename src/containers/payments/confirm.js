import React from 'react'

import { connect } from 'react-redux'

import {
  setTip
} from '../../actions'

import {
  getCurrentPayment
} from '../../reducers'

import ConfirmPayment from '../../components/payments/confirm'

const render = props => {
  return <ConfirmPayment {...props} />
}

const mapStateToProps = state => ({
  payment: getCurrentPayment(state)
})

export default connect(
  mapStateToProps,
  {
    onSetTip: setTip
  }
)(render)
