// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import FacebookIcon from '../icons/FacebookIcon'
import InstagramIcon from '../icons/InstagramIcon'
import brandColours from '../../constants/brandColours'
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
  value = '',
  onChange,
  version,
  type,
}) => {
  const width = typeof widthProp === 'string' ? widthProp : ''
  const widthPercentage = typeof widthProp === 'number' ? widthProp : ''
  let labelValue
  if (label === 'none') {
    labelValue = ''
  } else if (label.icon) {
    switch (label.icon) {
      case 'facebook':
        labelValue = (
          <label htmlFor={htmlFor} className={`label_${label.position}`}>
            <FacebookIcon
              fill={brandColours.textColor}
              width="20"
            />
          </label>
        )
        break
      case 'instagram':
        labelValue = (
          <label htmlFor={htmlFor} className={`label_${label.position}`}>
            <InstagramIcon
              fill={brandColours.textCoolor}
              width="20"
            />
          </label>
        )
        break
      default:
        break
    }
  } else if (label) {
    labelValue = (
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
      {labelValue}
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
