import React, { Component } from 'react'

import { connect } from 'react-redux'

import {
  fetchIntegratedAddress,
  listenForPayments
} from '../../actions'

import {
  getCurrentPayment
} from '../../reducers'

import SendPayment from '../../components/payments/send'

class Container extends Component {
  componentDidMount () {
    this.fetchStuff()
  }

  componentDidUpdate (prevProps) {
    this.fetchStuff()
  }

  fetchStuff () {
    const {
      fetchIntegratedAddress,
      listenForPayments,
      payment
    } = this.props

    const {
      integratedAddress,
      paymentId,
      totalAmount
    } = payment

    if (integratedAddress == null || paymentId == null) {
      fetchIntegratedAddress()
    } else {
      listenForPayments(totalAmount, paymentId)
    }
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

export default connect(
  mapStateToProps,
  {
    fetchIntegratedAddress,
    listenForPayments
  }
)(Container)
