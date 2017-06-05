import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createPayment
} from '../../actions'

import CreatePayment from '../../components/payments/create'

const render = props => {
  return <CreatePayment {...props} />
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createPayment
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(render)
