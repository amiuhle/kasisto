import React from 'react'

import { connect } from 'react-redux'

import {
  startPayment
} from '../actions'

import Dashboard from '../components/dashboard'

const render = props => {
  return <Dashboard {...props} />
}

const mapDispatchToProps = (dispatch, { history, match }) => ({
  onStartPayment (e) {
    dispatch(startPayment('EUR')).then(([id]) => {
      console.log('payment created', id)
      history.push(`/payments/${id}/create`)
    })
    e.preventDefault()
  }
})

export default connect(null, mapDispatchToProps)(render)
