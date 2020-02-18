// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
import FacebookIcon from '../icons/FacebookIcon'
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

const Button = ({
  version = '',
  width: widthProp,
  marginBottom = 0,
  textAlign = '',
  textColour = '',
  bgColour = '',
  disabled,
  onClick,
  children,
  type = 'button',
}) => {
  const width = typeof widthProp === 'string' ? widthProp : ''
  const widthPercentage = typeof widthProp === 'number' ? widthProp : ''
  let fb_icon
  if (version === 'facebook') {
    fb_icon = (
      <FacebookIcon
        fill="#ffffff"
        width="20"
      />
    )
  }
  return (
    <button
      type={type}
      disabled={disabled}
      className={`button_${version} ${width}`}
      onClick={onClick}
      style={{
        width: `${widthPercentage}%`,
        color: textColour,
        textAlign,
        marginBottom,
        backgroundColor: bgColour,
      }}
    >
      {fb_icon}
      {children}
    </button>
  )
}

export default Button
