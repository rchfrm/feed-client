import React from 'react'
import PropTypes from 'prop-types'

import ButtonPill from '@/elements/ButtonPill'

// * ******
// * README
// * ******
/*
`options` must be an array of objects formatted like this:

  {
    id: [string: option id] *required,
    title: [string: option title, used as button text] *required,
    disabled: [boolean: option is disabled],
    color: [string: the color of the active state] optional (default: 'black'),
    activeTextColor: [string: the text color in the active state] optional (default: 'white'),
  }

*/

const PillOptions = (props) => {
  const {
    label,
    color,
    options,
    activeOption,
    setActiveOption,
    className,
    disabled,
    style,
  } = props
  return (
    <div
      className={[
        'pill--options-container',
        `color-${color}`,
        disabled ? 'opacity-50' : null,
        className,
      ].join(' ')}
      style={style}
    >
      {label && (
        <p className={['inputLabel__text', 'mb-4'].join(' ')}>{label}</p>
      )}
      <div
        className={[
          'pill--options',
        ].join(' ')}
      >
        {options.map(({ id, title, disabled: optionDisabled }) => {
          const active = id === activeOption
          return (
            <ButtonPill
              key={id}
              {...props}
              active={active}
              disabled={disabled || optionDisabled}
              className={['pill--option'].join(' ')}
              onClick={() => setActiveOption(id)}
            >
              {title}
            </ButtonPill>
          )
        })}
      </div>
    </div>
  )
}

PillOptions.propTypes = {
  label: PropTypes.string,
  color: PropTypes.oneOf(['black', 'green']),
  options: PropTypes.array.isRequired,
  activeOption: PropTypes.string.isRequired,
  setActiveOption: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
}

PillOptions.defaultProps = {
  color: 'black',
  label: '',
  className: '',
  disabled: false,
  style: null,
}


export default PillOptions
