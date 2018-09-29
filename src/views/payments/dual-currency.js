import React, { Component } from 'react'
import { Field } from 'redux-form'
import Big from 'big.js'

import FiatRate from '../../components/FiatRate'

const zeros = (times) => new Array(Math.max(0, times)).fill('0').join('')
const getCurrencyString = fiatCurrency => fiatCurrency || 'XMR'
const getMaxDecimals = currency => currency === null ? 12 : 2
const getDivisor = currency => currency === null ? 1e12 : 1e2

const sanitizeValue = (value, divisor) => {
  const sanitized = Math.round(value * divisor) / divisor

  // eslint-disable-next-line eqeqeq
  const valuesDiffer = value != sanitized

  return (valuesDiffer ? sanitized : value).toString()
}

const toXmr = (amount, rate = 1) => new Big(isNaN(amount) ? '0.0' : amount).div(rate).toFixed(12)

class CurrencyInput extends Component {
  state = {
    hasPendingDecimal: false
  }

  onKeyDown = e => {
    const { value } = this.props.input
    if ((e.key === '.' || e.keyCode === 229) || (e.keyCode === 8 && value.match(/\.\d$/))) {
      this.setState({
        hasPendingDecimal: true
      })
    } else {
      this.setState({
        hasPendingDecimal: false
      })
    }
  }

  render () {
    const {
      id,
      className,
      currency,
      input,
      autoFocus
    } = this.props

    const {
      onChange,
      value
    } = input

    const { hasPendingDecimal } = this.state

    let [, fraction] = value.split('.')
    let decimals

    const hasFraction = fraction !== undefined

    const maxDecimals = getMaxDecimals(currency)

    if (hasFraction) {
      decimals = maxDecimals - fraction.length
    } else {
      decimals = maxDecimals
    }

    let tail = `${!hasFraction && !hasPendingDecimal ? '.' : ''}${zeros(decimals)}`

    return (
      <label
        className={`c-currency c-currency--input ${className || ''}`}>
        <input
          id={id}
          onChange={onChange}
          value={value}
          onKeyDown={this.onKeyDown}
          className='c-currency--input__native_input'
          placeholder='00'
          type='number'
          step='0.01'
          min='0'
          autoFocus={autoFocus}
        />
        <span className='c-currency__tail'>
          {tail}
        </span>
        <small className='c-currency__currency'>{currency}</small>
      </label>
    )
  }
}

const CurrencyDisplay = ({ className, value, currency }) => {
  value = sanitizeValue(value, getDivisor(currency)).toString()
  const [, fraction] = value.split('.')
  const maxDecimals = getMaxDecimals(currency)

  let tail
  if (fraction != null) {
    tail = zeros(maxDecimals - fraction.length)
  } else {
    tail = `.${zeros(maxDecimals)}`
  }
  return (
    <span
      className={`c-currency ${className || ''}`}>
      <span className='c-currency__value'>
        {value}
      </span>
      &nbsp;
      <span className='c-currency__tail'>
        {tail}
      </span>
      <span className='c-currency__currency'>{getCurrencyString(currency)}</span>
    </span>
  )
}

const DualCurrency = ({ id, className, fiatCurrency, input, rate, autoFocus }) => (
  <div className={`c-dual-currency ${className || ''}`}>
    <CurrencyInput
      id={id}
      className='c-currency--primary u-margin-bottom-none'
      input={input}
      currency={fiatCurrency}
      autoFocus={autoFocus}
    />
    <FiatRate className='u-margin-bottom' fiatCurrency={fiatCurrency} rate={rate} />
    <CurrencyDisplay className='c-currency--secondary' value={toXmr(input.value, rate)} currency={null} />
  </div>
)

export default ({ rate, fiatCurrency, autoFocus }) =>
  <Field
    id='requestedAmount'
    name='requestedAmount'
    component={DualCurrency}
    autoFocus={autoFocus}
    rate={rate}
    fiatCurrency={fiatCurrency}
    format={(value) => sanitizeValue(value, getDivisor(fiatCurrency))}
  />
