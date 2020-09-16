import React from 'react'
import PropTypes from 'prop-types'

const TargetingSettingsHeader = ({ header, className }) => {
  return (
    <h4 className={['font-body', className].join(' ')}>
      <strong>{header}</strong>
    </h4>
  )
}

TargetingSettingsHeader.propTypes = {
  header: PropTypes.string.isRequired,
  className: PropTypes.string,
}

TargetingSettingsHeader.defaultProps = {
  className: null,
}


export default TargetingSettingsHeader
