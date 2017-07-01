import { func } from 'prop-types'
import React from 'react'

const Dashboard = (props) => {
  const { onStartPayment } = props

  return (
    <div>
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
