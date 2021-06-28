import React from 'react'
import PropTypes from 'prop-types'

const ControlsContentView = ({ activeSlug, className, controlsComponents }) => {
  return (
    <div className={className}>
      {controlsComponents[activeSlug]}
    </div>
  )
}

ControlsContentView.propTypes = {
  activeSlug: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ControlsContentView.defaultProps = {
  className: '',
}

export default ControlsContentView
