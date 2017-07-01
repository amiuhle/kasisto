import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class NoobHint extends Component {
  render () {
    const { text } = this.props
    return (
      <small className='c-hint u-muted'>{text}</small>
    )
  }

  static propTypes = {
    text: PropTypes.string.isRequired
  }
}
