// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
import FacebookIcon from '../../assets/icons/FacebookIcon'
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES
import './button.css'

function Button(props) {
  const version = props.version || ''
  const width = typeof props.width === 'string' ? props.width : ''
  const widthPercentage = typeof props.width === 'number' ? props.width : ''
  const marginBottom = props.marginBottom || 0
  const textAlign = props.textAlign || ''
  const textColour = props.textColour || ''
  const bgColour = props.bgColour || ''
  let fb_icon
  if (props.version === 'facebook') {
    fb_icon = (
      <FacebookIcon
        fill="#ffffff"
        width="20"
      />
    )
  }
  return (
    <button
      disabled={props.disabled}
      className={`button_${version} ${width}`}
      onClick={props.onClick}
      style={{
        width: `${widthPercentage}%`,
        color: textColour,
        textAlign,
        marginBottom,
        backgroundColor: bgColour,
      }}
    >
      {fb_icon}
      {props.children}
    </button>
  )
}

export default Button
