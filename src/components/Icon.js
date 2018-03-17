import '../icons/back.svg'
import '../icons/check.svg'
import '../icons/close.svg'
import '../icons/history.svg'
import '../icons/loading.svg'
import '../icons/monero.svg'
import '../icons/settings.svg'

import React from 'react'
import { Link } from 'react-router-dom'

const className = ({ className } = {}, ...rest) =>
  [className, ...rest]
    .filter(value => typeof value === 'string' && value.length > 0)
    .join(' ')

export default ({name, onClick, href, ...props}) => {
  let Tag = 'span'
  if (onClick != null) {
    Tag = 'a'
  } else if (href != null) {
    Tag = Link
  }

  return (
    <Tag
      {...props}
      onClick={onClick}
      to={href}
      className={className(props, 'icon', `icon--${name}`)}>
      <svg>
        <use xlinkHref={`#${name}`} />
      </svg>
    </Tag>
  )
}
