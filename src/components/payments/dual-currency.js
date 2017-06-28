import React, { Component } from 'react'
import {
  func,
  string
} from 'prop-types'

import {
  amountType,
  currencyType
} from './utils'

export default class DualCurrency extends Component {
  render () {
    const {
      id,
      from,
      to,
      fromAmount,
      toAmount,

      onSetFrom,
      onSetTo
    } = this.props

    const fiatCurrency = fiatCurrency => fiatCurrency || 'XMR'

    const props = (amount, onChange) => ({
      id: onChange == null ? null : id,
      value: amount || '',
      type: 'number',
      step: 0.01,
      className: 'u-align-right',
      onChange,
      disabled: onChange == null
    })

    return (
      <div className='c-dual-currency'>
        <p className='u-margin-bottom-tiny'>
          <input {...props(fromAmount, onSetFrom)} />
          <span>{fiatCurrency(from)}</span>
        </p>
        <p className='u-margin-bottom'>
          <input {...props(toAmount, onSetTo)} />
          <span>{fiatCurrency(to)}</span>
        </p>
      </div>
    )
  }

  static propTypes = {
    id: string,
    from: currencyType,
    to: currencyType,
    fromAmount: amountType,
    toAmount: amountType,

    onSetFrom: func,
    onSetTo: func
  }
}
