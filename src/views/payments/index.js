import { format } from 'date-fns'

import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'

import Icon from '../../components/Icon'

import {
  formatCurrency
} from './show'

const {
  Blob,
  URL
} = window

const ListItem = ({ id, receivedAmount, rate, fiatCurrency, updatedAt, paymentId }) => (
  <li className='c-payments__item o-list-bare__item u-padding-vertical u-padding-horizontal-small'>
    <Link to={`/payments/${id}`} className='o-flex o-flex--ai-center'>
      <span className={`o-circle u-notice--${receivedAmount ? 'success' : 'error'}`} />
      <span className='o-flex__stretch u-margin-horizontal o-flex o-flex--col o-flex--jc-center u-smaller'>
        <span>{format(updatedAt, 'MM/DD/YYYY – HH:MM')}</span>
        <span>{paymentId || '—'}</span>
      </span>
      <span className='u-medium'>
        {formatCurrency(receivedAmount, fiatCurrency, rate)}
      </span>
    </Link>
  </li>
)

const download = (json) => {
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
  return URL.createObjectURL(blob)
}

export default ({ payments }) => (
  <Fragment>
    <div className='o-app__content' style={{ margin: '54px 0' }}>
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
