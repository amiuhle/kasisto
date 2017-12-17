import React, { Component } from 'react'
import {
  string
} from 'prop-types'

import {
  currencyDisplayType
} from './utils'

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

class CurrencyInput extends Component {
  constructor (props, context) {
    super(props, context)

    const {
      currency,
      value
    } = props

    const divisor = getDivisor(currency)

    this.state = {
      currencyString: getCurrencyString(currency),
      maxDecimals: getMaxDecimals(currency),
      divisor,
      value,
      rawValue: sanitizeValue(value, divisor),
      hasFocus: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { value } = nextProps
    if (this.props.value !== value) {
      this.setState({
        value
      })
    }
  }

  onNativeInputChange = (e) => {
    const { onChange } = this.props
    const { value, divisor, hasPendingDecimal } = this.state
    const rawValue = sanitizeValue(e.target.value, divisor)

    this.setState({
      rawValue
    })

    // eslint-disable-next-line eqeqeq
    if (value != rawValue && !hasPendingDecimal) {
      onChange(rawValue)
    }
  }

  onKeyDown = e => {
    const { rawValue } = this.state
    if ((e.key === '.' || e.keyCode === 229) || (e.keyCode === 8 && rawValue.match(/\.\d$/))
      ) {
      this.setState({
        hasPendingDecimal: true
      })
    } else {
      this.setState({
        hasPendingDecimal: false
      })
    }
  }

  nativeInputRef = (nativeInput) => {
    if (nativeInput === null) {
      this.nativeInput.removeEventListener('focus', this.onFocus)
      this.nativeInput.removeEventListener('blur', this.onBlur)
    } else {
      nativeInput.addEventListener('focus', this.onFocus)
      nativeInput.addEventListener('blur', this.onBlur)
    }

    this.nativeInput = nativeInput
  }

  onFocus = (e) => {
    this.setState({
      hasFocus: true
    })
  }

  onBlur = (e) => {
    this.setState({
      hasFocus: false
    })
  }

  render () {
    const {
      id,
      className,
      disabled
    } = this.props

    const {
      currencyString,
      maxDecimals,
      rawValue,
      hasPendingDecimal,
      hasFocus
    } = this.state

    let [, fraction] = rawValue.split('.')
    let decimals

    const hasFraction = fraction !== undefined

    if (hasFraction) {
      decimals = maxDecimals - fraction.length
    } else {
      decimals = maxDecimals
    }

    let tail = `${!hasFraction && !hasPendingDecimal ? '.' : ''}${zeros(decimals)}`

    return (
      <label
        className={`c-currency c-currency--input ${disabled ? 'c-currency--disabled' : ''} ${hasFocus ? 'c-currency--input--focus' : ''} ${className || ''}`}>
        <input
          ref={this.nativeInputRef}
          className='c-currency--input__native_input'
          onKeyDown={this.onKeyDown}
          onChange={this.onNativeInputChange}
          {...{
            id,
            value: rawValue,
            disabled
          }}
          type='number'
          step={`0.${zeros(maxDecimals - 1)}1`}
        />
        <span className='c-currency__tail'>
          {tail}
        </span>
        <small className='c-currency__currency'>{currencyString}</small>
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
      <span className='c-currency__tail'>
        {tail}
      </span>
      <span className='c-currency__currency'>{getCurrencyString(currency)}</span>
    </span>
  )
}

export default class DualCurrency extends Component {
  render () {
    const {
      className,
      id,
      primary,
      secondary
    } = this.props

    const renderCurrency = ({amount, onChange, ...rest}) => {
      const value = amount || ''
      if (onChange != null) {
        return <CurrencyInput {...{id, value, onChange}} {...rest} />
      } else {
        return <CurrencyDisplay value={amount || 0} {...rest} />
      }
    }

    return (
      <div className={`c-dual-currency ${className || ''}`}>
        {renderCurrency({...primary, className: 'c-currency--primary'})}
        {renderCurrency({...secondary, className: 'c-currency--secondary'})}
      </div>
    )
  }

  static propTypes = {
    id: string,
    className: string,
    primary: currencyDisplayType,
    secondary: currencyDisplayType
  }
}
