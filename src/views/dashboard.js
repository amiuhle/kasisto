import Big from 'big.js'
import { format } from 'date-fns'

import { func } from 'prop-types'
import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'

import Icon from '../components/Icon'

const Dashboard = ({ onStartPayment, settings, lastPayment }) => (
  <Fragment>
    <div className='o-app__content c-dashboard'>
      <div className='c-dashboard--top'>
        <img
          className='c-owner-logo u-margin-bottom-small'
          src={settings.logo}
        />
        <h1 className='u-margin-none'>{settings.name || 'Coffee shop'}</h1>
        <small>{format(new Date(), 'DD MMMM YYYY')}</small>
      </div>
      <div className='c-dashboard--bottom'>
        <button className='c-btn c-btn--rounded' onClick={onStartPayment}>
          Request New Payment
        </button>
      </div>
      <div className='c-dashboard--overlay'>
        <small className='c-badge'>Today</small>
        <div className='u-margin-top-small u-margin-bottom-large c-dashboard__overview'>
          <div>
            <span>{settings.exchangeRate ? new Big(settings.exchangeRate).toFixed(2) : '--'}</span>
            <small>{settings.fiatCurrency || 'EUR'} / XMR</small>
          </div>
          <div>
            <span>{lastPayment ? format(lastPayment.createdAt, 'HH:mm') : '--'}</span>
            <small>Last payment</small>
          </div>
        </div>
        <Link to='/payments' className='o-flex o-flex--jc-center u-brand-primary u-medium u-margin-bottom'>
          <Icon name='history' className='icon--brand' />
          <span className='u-margin-left-tiny'>See history</span>
        </Link>
      </div>
    </div>

    <div className='o-app__top-right'>
      <Icon href='/settings' name='settings' className='icon--white' />
    </div>
  </Fragment>
)

Dashboard.propTypes = {
  onStartPayment: func.isRequired
}

export default Dashboard
