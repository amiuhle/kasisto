import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setTip
} from '../../actions'

import {
  getCurrentPayment
} from '../../reducers'

import ConfirmPayment from '../../components/payments/confirm'

const render = props => <ConfirmPayment {...props} />

const mapStateToProps = state => ({
  payment: getCurrentPayment(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStartPayment (e) {
    const { history } = ownProps
    e.preventDefault()
    history.push('/payment/send')
  },
  ...bindActionCreators({
    onSetTip: setTip
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
