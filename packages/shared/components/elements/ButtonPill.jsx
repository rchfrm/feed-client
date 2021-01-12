import React from 'react'
import PropTypes from 'prop-types'

import { track } from '@/app/helpers/trackingHelpers'

const ButtonPill = ({
  active,
  disabled,
  highlight,
  hasIcon,
  size,
  onClick,
  trackAction,
  trackValue,
  trackLabel,
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

  const handleClick = (e) => {
    if (trackValue || trackLabel) {
      track({
        action: trackAction || 'button_click',
        category: 'generic',
        label: trackLabel,
        value: trackValue,
      })
    }
    onClick(e)
  }

  return (
    <button
      className={classes.join(' ')}
      onClick={handleClick}
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
  trackAction: PropTypes.string,
  trackValue: PropTypes.string,
  trackLabel: PropTypes.string,
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
  trackAction: '',
  trackValue: '',
  trackLabel: '',
  style: {},
  className: '',
}


export default ButtonPill
