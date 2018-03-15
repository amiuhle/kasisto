import React from 'react'

import { connect } from 'react-redux'

import Payments from '../../views/payments/index'

import {

} from '../../actions/payments'

import {
  getAllPayments
} from '../../reducers'

const render = props => {
  return <Payments {...props} />
}

const mapStateToProps = (state, { match }) => ({
  payments: getAllPayments(state)
})

const mapDispatchToProps = (dispatch, { history, match }) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
