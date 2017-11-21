import React from 'react'

const className = ({ className } = {}, ...rest) =>
[className, ...rest]
  .filter(value => typeof value === 'string' && value.length > 0)
  .join(' ')

const icons = require.context('../../icons', false, /\.svg$/)
icons.keys().forEach(icons)

export default ({name, onClick, href, ...props}) => {
  const Tag = onClick == null && href == null ? 'span' : 'a'
  return (
    <Tag
      {...props}
      onClick={onClick}
      href={href}
      className={className(props, 'icon', `icon--${name}`)}>
      <svg>
        <use xlinkHref={`#${name}`} />
      </svg>
    </Tag>
  )
}
