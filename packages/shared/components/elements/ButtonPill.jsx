import React from 'react'
import PropTypes from 'prop-types'

import { track } from '@/helpers/trackingHelpers'
import * as utils from '@/helpers/utils'

const ButtonPill = ({
  active,
  disabled,
  highlight,
  hasIcon,
  size,
  onClick,
  trackAction,
  style,
  className,
  children,
  trackComponentName,
  isCentered,
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
    if (trackComponentName) {
      const buttonText = utils.getStringFromChildrenProp(children)

      track(trackAction || 'button_click', {
        buttonText,
        componentName: trackComponentName,
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
      <div
        className={[
          'button--pill-inner',
          isCentered ? 'justify-center' : 'justify-between',
        ].join(' ')}
      >
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
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  trackComponentName: PropTypes.string,
  isCentered: PropTypes.bool,
}

ButtonPill.defaultProps = {
  active: false,
  disabled: false,
  highlight: false,
  hasIcon: false,
  size: 'regular',
  trackAction: '',
  style: {},
  className: '',
  trackComponentName: '',
  isCentered: true,
}


export default ButtonPill
