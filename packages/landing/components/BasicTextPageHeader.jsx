import React from 'react'
import PropTypes from 'prop-types'

const BasicTextPageHeader = ({ header, size, Tag, className, margin }) => {
  return (
    <Tag
      className={[
        size === 'large' ? 'text-4xl' : 'text-3xl',
        margin === 'small' ? 'mb-3' : 'mb-6 sm:mb-8',
        className,
      ].join(' ')}
    >
      {header}
    </Tag>
  )
}

BasicTextPageHeader.propTypes = {
  header: PropTypes.string.isRequired,
  size: PropTypes.string,
  Tag: PropTypes.string,
  className: PropTypes.string,
  margin: PropTypes.string,
}

BasicTextPageHeader.defaultProps = {
  Tag: 'h2',
  size: 'reg',
  className: null,
  margin: 'large',
}

export default BasicTextPageHeader
