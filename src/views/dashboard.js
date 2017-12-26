import { format } from 'date-fns'

import { func } from 'prop-types'
import React, { Fragment } from 'react'

import Icon from '../components/Icon'

const Dashboard = ({ onStartPayment, settings }) => (
  <Fragment>
    <div className='o-app__content c-dashboard'>
      <div className='c-dashboard--top'>
        <img
          style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }}
          src='https://s3-alpha.figma.com/img/b1e6/db2f/ca3b257e50393b55874c13d33f4daf70?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJK6APQGEHTP6I3PA%2F20171222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20171222T194139Z&X-Amz-Expires=60&X-Amz-SignedHeaders=host&X-Amz-Signature=c7246ecb112f28d1874366ddb5c7eccb62b140f7f2bb7b25649b6c1df5a54362'
        />
        <h1 className='u-margin-none'>{settings.name || 'Coffee shop'}</h1>
        <small>{format(new Date(), 'DD MMMM YYYY')}</small>
      </div>
      <div className='c-dashboard--bottom'>
        <button className='c-btn c-btn--rounded' onClick={onStartPayment}>
          Request New Payment
        </button>
      </div>
      <div className='c-dashboard--overlay' />
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
