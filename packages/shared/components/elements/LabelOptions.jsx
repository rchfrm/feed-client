import React from 'react'
import PropTypes from 'prop-types'

import { track } from '@/app/helpers/trackingHelpers'

// * ******
// * README
// * ******
/*
`options` must be an array of objects formatted like this:

  {
    id: [string: option id] *required,
    title: [string: option title, used as button text] *required,
    disabled: [boolean: option is disabled],
  }

*/

const LabelOptions = ({
  options,
  activeOptionId,
  setActiveOptionId,
  trackLabel,
  trackLocation,
  className,
}) => {
  return (
    <ul
      className={[
        'flex',
        className,
      ].join(' ')}
    >
      {options.map(({ id, title }) => {
        const isActive = id === activeOptionId
        return (
          <li
            key={id || title}
            className={[
              'mr-5 last:mr-0',
            ].join(' ')}
          >
            <button
              className={[
                'inputLabel__text',
                'mb-0',
                isActive ? 'text-black' : 'text-grey-3',
              ].join(' ')}
              onClick={() => {
                setActiveOptionId(id)
                track('label_option_clicked', {
                  label: trackLabel,
                  value: title,
                  location: trackLocation,
                })
              }}
            >
              {title}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

LabelOptions.propTypes = {
  options: PropTypes.array.isRequired,
  activeOptionId: PropTypes.string.isRequired,
  setActiveOptionId: PropTypes.func.isRequired,
  trackLabel: PropTypes.string.isRequired,
  trackLocation: PropTypes.string,
  className: PropTypes.string,
}

LabelOptions.defaultProps = {
  trackLocation: '',
  className: null,
}

export default LabelOptions
