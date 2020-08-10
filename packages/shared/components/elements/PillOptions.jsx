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
    options,
    activeOption,
    setActiveOption,
    className,
    disabled,
  } = props
  return (
    <div
      className={[
        'pill--options-container',
        disabled ? 'opacity-50' : null,
        className,
      ].join(' ')}
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
  options: PropTypes.array.isRequired,
  activeOption: PropTypes.string.isRequired,
  setActiveOption: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

PillOptions.defaultProps = {
  label: '',
  className: '',
  disabled: false,
}


export default PillOptions
