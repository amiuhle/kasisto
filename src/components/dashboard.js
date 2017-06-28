import { func } from 'prop-types'
import React from 'react'

const Dashboard = (props) => {
  const { onStartPayment } = props

  return (
    <div className='u-align-center'>
      <button className='c-btn' onClick={onStartPayment}>
        Start Payment
      </button>
    </div>
  )
}

Dashboard.propTypes = {
  onStartPayment: func.isRequired
}

export default Dashboard
