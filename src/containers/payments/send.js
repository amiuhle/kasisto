import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  fetchUri,
  listenForPayments,
  stopListeningForPayments,
  setTip
} from '../../actions'

import {
  getPaymentById,
  getSettings
} from '../../reducers'

import SendPayment from '../../views/payments/send'

class Container extends Component {
  componentDidMount () {
    // const {
    //   listenForPayments,
    //   payment
    // } = this.props

    // const {
    //   id,
    //   paymentId,
    //   totalAmount
    // } = payment

    // listenForPayments(id, totalAmount, paymentId)
    //   .then(handle => this.setState({ handle }))
  }

  componentWillUnmount () {
    // const { stopListeningForPayments } = this.props
    // const { handle } = this.state
    // stopListeningForPayments(handle)
  }

  render () {
    return (
      <SendPayment {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  payment: getPaymentById(state, ownProps.match.params.id),
  settings: getSettings(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators({
    fetchUri,
    listenForPayments,
    stopListeningForPayments,
    setTip
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)
