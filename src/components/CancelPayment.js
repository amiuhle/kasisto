import React from 'react'

import { Link } from 'react-router-dom'

export default ({ className = 'o-app__top-right', text = 'Cancel', ...props }) => (
  <Link to='/' className={className} {...props}>
    { text }
  </Link>
)
