import { func } from 'prop-types'
import React from 'react'

import moneroAccepted from '../images/monero-accepted-white-01.svg'

const Dashboard = (props) => {
  const { onStartPayment } = props

  return (
    <div className='o-flex o-flex--col' style={{ height: '100%' }}>
      <img className='o-flex__stretch' src={moneroAccepted} />
      <div className='u-margin-bottom u-margin-top-large o-flex o-flex--col'>
        <button className='c-btn' onClick={onStartPayment}>
          Start Payment
        </button>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  onStartPayment: func.isRequired
}

export default Dashboard
