import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setHost,
  setPort
} from '../actions'

import Settings from '../components/settings'

const render = props => {
  return <Settings {...props} />
}

const mapStateToProps = state => ({
  settings: state.settings
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators({
    onSetHost: e => setHost(e.target.value),
    onSetPort: e => setPort(e.target.value)
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(render)
