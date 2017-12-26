import React from 'react'

import { connect } from 'react-redux'

import {
  startPayment
} from '../actions'

import {
  getSettings
} from '../reducers'

import Dashboard from '../views/dashboard'

const render = props => {
  return <Dashboard {...props} />
}

const mapStateToProps = (state, { match }) => ({
  settings: getSettings(state)
})

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

export default connect(mapStateToProps, mapDispatchToProps)(render)
