import React from 'react'

export default ({exchange, rate}) => (
  <aside className='u-muted'>
    1 XMR = {rate} EUR <br />
    <a target='_blank' href={exchange}>{exchange}</a>
  </aside>
)
