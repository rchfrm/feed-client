import React from 'react'
import PropTypes from 'prop-types'

import copy from '@/app/copy/controlsPageCopy'

const { controlsOptions } = copy

const ControlsContentOptions = ({ className }) => {
  const [activeOptionKey, setActiveOptionKey] = React.useState(controlsOptions[0].key)
  return (
    <div
      className={[
        'border-solid border-green border-t-2',
        className,
      ].join(' ')}
    >
      {controlsOptions.map((option) => {
        if (option.hidden) return null
        const { key, title, description } = option
        const isActive = key === activeOptionKey
        console.log(isActive)
        return (
          <a
            key={key}
            role="button"
            className={[
              'flex no-underline',
              'py-4',
              'border-solid border-green border-b-2',
            ].join(' ')}
            onClick={() => setActiveOptionKey(key)}
          >
            {/* TITLE */}
            <div>
              <p className="font-bold mb-2">{title}</p>
              <p className="mb-0">{description}</p>
            </div>
          </a>
        )
      })}
    </div>
  )
}

ControlsContentOptions.propTypes = {
  className: PropTypes.string,
}

ControlsContentOptions.defaultProps = {
  className: null,
}

export default ControlsContentOptions
