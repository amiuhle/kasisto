import React from 'react'

import { connect } from 'react-redux'

import Settings from '../views/settings'

import {
  saveSettings
} from '../actions/settings'

import {
  getSettings
} from '../reducers'

const render = props => {
  return <Settings {...props} />
}

const mapStateToProps = (state, { match }) => ({
  initialValues: getSettings(state)
})

const mapDispatchToProps = (dispatch, { history, match }) => ({
  onSubmit (settings) {
    dispatch(saveSettings(Object.assign({}, settings, { exchangeRate: null })))
    history.push('/')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
