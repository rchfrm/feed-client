// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import FacebookIcon from '../../icons/FacebookIcon'
import InstagramIcon from '../../icons/InstagramIcon'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES
pu


function Input(props) {
  const float = props.float ? props.float : ''
  const width = typeof props.width === 'string' ? props.width : ''
  const widthPercentage = typeof props.width === 'number' ? props.width : ''
  const paddingRight = props.paddingRight ? props.paddingRight : ''
  const readonly = props.readonly ? props.readonly : false
  let label
  if (props.label === 'none') {
    label = ''
  } else if (props.label.icon) {
    switch (props.label.icon) {
      case 'facebook':
        label = (
          <label className={`label_${props.label.position}`}>
            <FacebookIcon
              fill="#000000"
              width="20"
            />
          </label>
        )
        break
      case 'instagram':
        label = (
          <label className={`label_${props.label.position}`}>
            <InstagramIcon
              fill="#000000"
              width="20"
            />
          </label>
        )
        break
      default:
        break
    }
  } else if (props.label) {
    label = (
      <label className={`label_${props.label.position}`}>{props.label.text}</label>
    )
  }

  return (
    <div
      className={width}
      style={{
        width: `${widthPercentage}%`,
        float,
        paddingRight: `${paddingRight}%`,
      }}
    >
      {label}
      <input
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={props.version}
        type={props.type}
        readOnly={readonly}
      />

    </div>
  )
}

export default Input
