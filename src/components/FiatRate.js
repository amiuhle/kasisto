import Big from 'big.js'
import React from 'react'
import Icon from './Icon'

export default ({fiatCurrency, rate, exchange, className}) => (
  <small className={`${className || ''}`}>
    { rate == null ? <Icon name='loading' /> : new Big(rate).toFixed(2) } {fiatCurrency} / XMR <br />
    <a target='_blank' href={exchange}>{exchange}</a>
  </small>
)
