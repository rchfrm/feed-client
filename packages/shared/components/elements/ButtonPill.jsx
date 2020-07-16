import React from 'react'
import PropTypes from 'prop-types'

const ButtonPill = ({
  active,
  hasIcon,
  size,
  onClick,
  style,
  className,
  children,
}) => {
  const classes = [
    'button--pill',
    active ? '-active' : '',
    hasIcon ? '-has-icon' : '',
    `-${size}`,
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
  active: PropTypes.bool,
  hasIcon: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
}

ButtonPill.defaultProps = {
  active: false,
  hasIcon: false,
  size: 'regular',
  style: {},
  className: '',
}


export default ButtonPill
