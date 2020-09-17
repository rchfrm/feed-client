import React from 'react'
import PropTypes from 'prop-types'

const TargetingSectionHeader = ({ header, className }) => {
  return (
    <h4 className={['font-body', className].join(' ')}>
      <strong>{header}</strong>
    </h4>
  )
}

TargetingSectionHeader.propTypes = {
  header: PropTypes.string.isRequired,
  className: PropTypes.string,
}

TargetingSectionHeader.defaultProps = {
  className: null,
}


export default TargetingSectionHeader
