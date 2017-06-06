import React, { Component } from 'react'

import { connect } from 'react-redux'

import {
  fetchIntegratedAddress
} from '../../actions'

import {
  getCurrentPayment
} from '../../reducers'

import SendPayment from '../../components/payments/send'

class Container extends Component {
  componentDidMount () {
    this.receiveIntegratedAddress()
  }

  componentDidUpdate (prevProps) {
    this.receiveIntegratedAddress()
  }

  receiveIntegratedAddress () {
    const { fetchIntegratedAddress } = this.props
    fetchIntegratedAddress()
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
    fetchIntegratedAddress
  }
)(Container)
