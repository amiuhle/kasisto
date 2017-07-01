import React from 'react'

import { connect } from 'react-redux'

import {
  startPayment
} from '../actions'

import Dashboard from '../components/dashboard'

const render = props => {
  return <Dashboard {...props} />
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStartPayment (e) {
    const { history } = ownProps
    dispatch(startPayment('EUR'))
    e.preventDefault()
    history.push('/payments/create')
  }
})

export default connect(null, mapDispatchToProps)(render)
