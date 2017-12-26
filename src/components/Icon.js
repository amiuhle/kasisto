import React from 'react'

import { Link } from 'react-router-dom'

const className = ({ className } = {}, ...rest) =>
[className, ...rest]
  .filter(value => typeof value === 'string' && value.length > 0)
  .join(' ')

const icons = require.context('../icons', false, /\.svg$/)
icons.keys().forEach(icons)

export default ({name, onClick, href, ...props}) => {
  const Tag = onClick == null && href == null ? 'span' : Link
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
