import QRCode from 'qrcode.react'
import React, { Component, Fragment } from 'react'

import Icon from './Icon'

const selectAll = (e) => {
  e.target.setSelectionRange(0, e.target.value.length)
}

export default class PaymentRequest extends Component {
  state = {
    showAddress: false
  }

  toggle = () => {
    this.setState({
      showAddress: !this.state.showAddress
    })
  }

  render () {
    const {
      integratedAddress,
      uri
    } = this.props
    const { showAddress } = this.state

    return (
      <Fragment>
        {
          (() => {
            if (showAddress) {
              return (
                <div className='c-integrated-address'>
                  <Icon name='close' className='u-margin-bottom-small' onClick={this.toggle} />
                  <textarea autoFocus onFocus={selectAll} defaultValue={integratedAddress} />
                </div>
              )
            } else if (uri != null) {
              return (
                <div onClick={this.toggle}>
                  <QRCode size={192} value={uri} />
                </div>
              )
            } else {
              return null
            }
          })()
        }
      </Fragment>
    )
  }
}
