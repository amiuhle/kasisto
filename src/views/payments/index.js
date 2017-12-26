import React, { Fragment } from 'react'

import Icon from '../../components/Icon'

export default () => (
  <Fragment>
    <div className='o-app__content o-content'>
      <span>Coming soon™</span>
    </div>
    <div className='o-app__top-left'>
      <Icon href='/' name='back' />
    </div>
    <div className='o-app__header'>History</div>
  </Fragment>
)
