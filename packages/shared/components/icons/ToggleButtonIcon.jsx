import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { red, green, greyLight } = brandColors

const getIconProps = (state, defaultState) => {
  // Force on state
  if (state === 'on') {
    return {
      border: green,
      bg: green,
      switchX: 52,
    }
  }
  // Force off state
  if (state === 'off') {
    return {
      border: red,
      bg: red,
      switchX: 14,
    }
  }
  // Default state
  return {
    border: defaultState === 'on' ? green : red,
    bg: greyLight,
    switchX: 33,
  }
}

const ToggleButtonIcon = ({ state, defaultState, className }) => {
  const { border, bg, switchX } = getIconProps(state, defaultState)
  return (
    <svg className={className} width="66" height="30" viewBox="0 0 66 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="64" height="28" rx="14" fill={bg} stroke={border} strokeWidth="2" />
      <circle cx={switchX} cy="15" r="11" fill="white" />
      {state === 'default' && (
        <>
          <circle cx="55.5" cy="15" r="2.4" fill={green} />
          <circle cx="10.5" cy="15" r="2.4" fill={red} />
        </>
      )}
    </svg>
  )
}

ToggleButtonIcon.propTypes = {
  state: PropTypes.oneOf([
    'on', 'off', 'default',
  ]).isRequired,
  defaultState: PropTypes.oneOf([
    'on', 'off', '',
  ]),
  className: PropTypes.string,
}

ToggleButtonIcon.defaultProps = {
  defaultState: '',
  className: '',
}


export default ToggleButtonIcon
