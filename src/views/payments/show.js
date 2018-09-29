import Big from 'big.js'

import { format } from 'date-fns'

import React, { Fragment } from 'react'

import Icon from '../../components/Icon'

export default ({ payment: {
  address, convertedAmount, createdAt, fiatCurrency, height, id, integratedAddress,
  paymentId, rate, receipt, receivedAmount, requestedAmount, updatedAt, uri } }
) => (
  <Fragment>
    <div className='o-app__content u-margin-horizontal' style={{ margin: '54px 0' }}>
      <table className='o-table o-table--tiny u-margin-top'>
        <tbody>
          <tr>
            <th scope='row'>Exchange Rate</th>
            <td className='u-align-right'>{rate} {fiatCurrency}/XMR</td>
          </tr>
          <tr>
            <th scope='row'>Amount Requested</th>
            <td className='u-align-right'>
              {formatCurrency(requestedAmount, fiatCurrency)}<br />
              <small>{formatCurrency(convertedAmount)}</small>
            </td>
          </tr>
          <tr>
            <th scope='row'>Amount Received</th>
            <td className='u-align-right'>
              {formatCurrency(receivedAmount, fiatCurrency, rate)}<br />
              <small>{formatCurrency(receivedAmount)}</small>
            </td>
          </tr>
          <tr>
            <th scope='row'>Tip</th>
            <td className='u-align-right'>
              {(receivedAmount && formatCurrency(new Big(receivedAmount).times(rate).minus(requestedAmount), fiatCurrency)) || '—'}<br />
              <small>{(receivedAmount && formatCurrency(new Big(receivedAmount).minus(convertedAmount))) || '—'}</small>
            </td>
          </tr>
          <tr>
            <th scope='row'>Created</th>
            <td className='u-align-right'>
              {format(createdAt, 'MM/DD/YYYY – HH:MM')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className='o-app__top-left'>
      <Icon href='/payments' name='back' />
    </div>
    <div className='o-app__header'>Payment Details</div>
  </Fragment>
)

export const formatCurrency = (amount, fiatCurrency = null, rate = 1) => {
  try {
    const decimals = fiatCurrency === null ? 12 : 2
    return `${new Big(amount).times(rate).toFixed(decimals)} ${fiatCurrency || 'XMR'}`
  } catch (e) {
    return '—'
  }
}
