import React from 'react'
import PropTypes from 'prop-types'

const ButtonPill = ({
  active,
  disabled,
  highlight,
  hasIcon,
  size,
  onClick,
  style,
  className,
  children,
}) => {
  const classes = [
    'button--pill',
    active ? '-active' : null,
    disabled ? '-disabled' : null,
    highlight ? '-highlighted' : null,
    hasIcon ? '-has-icon' : null,
    `-${size}`,
    className,
  ]
  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      <div className="button--pill-inner">
        {children}
      </div>
    </button>
  )
}

ButtonPill.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  highlight: PropTypes.bool,
  hasIcon: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
}

ButtonPill.defaultProps = {
  active: false,
  disabled: false,
  highlight: false,
  hasIcon: false,
  size: 'regular',
  style: {},
  className: '',
}


export default ButtonPill
