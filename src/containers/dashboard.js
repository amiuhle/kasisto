import React from 'react'

import { connect } from 'react-redux'

import {
  startPayment
} from '../actions'

import Dashboard from '../views/dashboard'

const render = props => {
  return <Dashboard {...props} />
}

const mapDispatchToProps = (dispatch, { history, match }) => ({
  onStartPayment (e) {
    e.preventDefault()
    return new Promise((resolve, reject) => {
      dispatch(startPayment('EUR', resolve, reject))
    }).then((id) => {
      console.log('payment created', id)
      history.push(`/payments/${id}/create`)
    })
  }
})

export default connect(null, mapDispatchToProps)(render)
