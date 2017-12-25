import React from 'react'

export default ({className, exchange, rate}) => (
  <aside className={`u-muted ${className || ''}`}>
    1 XMR = {rate} EUR <br />
    <a target='_blank' href={exchange}>{exchange}</a>
  </aside>
)
