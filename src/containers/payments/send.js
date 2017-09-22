import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  fetchUri,
  listenForPayments,
  stopListeningForPayments
} from '../../actions'

import {
  getCurrentPayment
} from '../../reducers'

import SendPayment from '../../components/payments/send'

class Container extends Component {
  componentDidMount () {
    const {
      fetchUri,
      listenForPayments,
      payment
    } = this.props

    const {
      integratedAddress,
      paymentId,
      totalAmount
    } = payment

    fetchUri(integratedAddress, totalAmount)

    listenForPayments(totalAmount, paymentId)
      .then(handle => this.setState({ handle }))
  }

  componentWillUnmount () {
    const { stopListeningForPayments } = this.props
    const { handle } = this.state
    stopListeningForPayments(handle)
  }

  render () {
    return (
      <SendPayment {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  payment: getCurrentPayment(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators({
    fetchUri,
    listenForPayments,
    stopListeningForPayments
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)
