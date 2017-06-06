import React, { Component, PropTypes } from 'react'

const selectAll = (e) => {
  e.target.setSelectionRange(0, e.target.value.length)
}

export default class IntegratedAddress extends Component {
  autosize = (textarea) => {
    if (textarea) {
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  render () {
    const { className, integratedAddress } = this.props
    return (
      <textarea ref={this.autosize} className={`${className} c-integrated-address`} value={integratedAddress} readOnly onFocus={selectAll} />
    )
  }
  static propTypes = {
    // TODO Test for Monero integrated_address (eg regex)?
    className: PropTypes.string,
    integratedAddress: PropTypes.string.isRequired
  }
}
