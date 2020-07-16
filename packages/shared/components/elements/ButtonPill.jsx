import React from 'react'
import PropTypes from 'prop-types'

const ButtonPill = ({
  hasIcon,
  size,
  onClick,
  style,
  className,
  children,
}) => {
  const classes = [
    'button--pill',
    `-${size}`,
    hasIcon ? '-has-icon' : '',
    className,
  ]
  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      style={style}
    >
      <div className="button--pill-inner">
        {children}
      </div>
    </button>
  )
}

ButtonPill.propTypes = {
  hasIcon: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
}

ButtonPill.defaultProps = {
  hasIcon: false,
  size: 'regular',
  style: {},
  className: '',
}


export default ButtonPill
