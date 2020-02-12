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

const Input = ({
  float = '',
  width: widthProp,
  paddingRight = '',
  readonly = false,
  label,
  htmlFor = '',
  name,
  placeholder,
  value,
  onChange,
  version,
  type,
}) => {
  const width = typeof widthProp === 'string' ? widthProp : ''
  const widthPercentage = typeof widthProp === 'number' ? widthProp : ''
  if (label === 'none') {
    label = ''
  } else if (label.icon) {
    switch (label.icon) {
      case 'facebook':
        label = (
          <label htmlFor={htmlFor} className={`label_${label.position}`}>
            <FacebookIcon
              fill="#000000"
              width="20"
            />
          </label>
        )
        break
      case 'instagram':
        label = (
          <label htmlFor={htmlFor} className={`label_${label.position}`}>
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
  } else if (label) {
    label = (
      <label htmlFor={htmlFor} className={`label_${label.position}`}>{label.text}</label>
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
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={version}
        type={type}
        readOnly={readonly}
      />

    </div>
  )
}

export default Input
