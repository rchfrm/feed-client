import React from 'react'
import PropTypes from 'prop-types'

import CloseCircle from '@/icons/CloseCircle'

const ButtonCloseCircle = ({ onClick, size, label, className, style, svgClassname }) => {
  return (
    <button
      onClick={onClick}
      className={['button--close', `button--close-${size}`, className].join(' ')}
      style={style}
      label={label}
      aria-label={label}
    >
      <CloseCircle className={svgClassname} />
    </button>
  )
}

ButtonCloseCircle.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  svgClassname: PropTypes.string,
}

ButtonCloseCircle.defaultProps = {
  size: 'regular',
  className: null,
  svgClassname: null,
  style: null,
  label: 'Close',
}


export default ButtonCloseCircle
