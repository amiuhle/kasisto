import React from 'react'

import { connect } from 'react-redux'

import ShowPayment from '../../views/payments/show'

import {
  getPaymentById
} from '../../reducers'

const render = props => {
  return <ShowPayment {...props} />
}

const mapStateToProps = (state, { match }) => ({
  payment: getPaymentById(state, match.params.id)
})

const mapDispatchToProps = (dispatch, { history, match }) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
