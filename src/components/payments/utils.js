import {
  oneOfType,
  oneOf,

  number,
  string
} from 'prop-types'

export const XMR = null
export const EUR = 'EUR'
export const USD = 'USD'

export const amountType = oneOfType([number, string])
export const currencyType = oneOf([XMR, EUR, USD])
