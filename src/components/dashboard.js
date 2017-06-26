import PropTypes from 'prop-types'
import React from 'react'

const Dashboard = (props) => {
  const { actions: { startPayment }, history } = props
  const onClick = (e) => {
    startPayment('EUR')
    history.push('/payments/create')
  }

  return (
    <div>
      <button onClick={onClick}>Start Payment</button>
    </div>
  )
}

Dashboard.propTypes = {
  actions: PropTypes.shape({
    startPayment: PropTypes.func.isRequired
  }).isRequired
}

export default Dashboard
