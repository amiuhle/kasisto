import Big from 'big.js'
import React, { Fragment } from 'react'

import Icon from '../../components/Icon'

const {
  Blob,
  URL
} = window

const formatDate = (dateString) => new Date(dateString).toLocaleString()
// {
//   const date = new Date(dateString)
//   return `${date.toLocaleDateString()} – ${date.toLocaleTimeString()}`
// }

const getAmount = (receivedAmount, rate, fiatCurrency) => {
  try {
    return `${new Big(receivedAmount).times(rate).toFixed(2)} ${fiatCurrency}`
  } catch (e) {
    return '—'
  }
}

const ListItem = ({id, receivedAmount, rate, fiatCurrency, updatedAt, paymentId}) => (
  <li className='c-payments__item o-list-bare__item u-padding-vertical u-padding-horizontal-small o-flex o-flex--ai-center'>
    <span className={`o-circle u-notice--${receivedAmount ? 'success' : 'error'}`} />
    <span className='o-flex__stretch u-margin-horizontal o-flex o-flex--col o-flex--jc-center u-smaller'>
      <span>{formatDate(updatedAt)}</span>
      <span>{paymentId || '—'}</span>
    </span>
    <span className='u-medium'>
      {getAmount(receivedAmount, rate, fiatCurrency)}
    </span>
  </li>
)

const download = (json) => {
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
  return URL.createObjectURL(blob)
}

export default ({ payments }) => (
  <Fragment>
    <div className='o-app__content' style={{margin: '54px 0'}}>
      <ul className='c-payments o-list-bare u-margin-horizontal-small u-margin-vertical-none'>
        { payments.map(payment => <ListItem key={payment.id} {...payment} />) }
      </ul>
    </div>
    <div className='o-app__top-left'>
      <Icon href='/' name='back' />
    </div>
    <div className='o-app__header'>History</div>
    <a className='c-btn o-app__footer'
      href={download(payments)}
      download={`kasisto-payments-${new Date().toISOString()}.json`}
    >
      Download
    </a>
  </Fragment>
)
