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
            {/* ICON */}
            <div className="mr-5" style={{ opacity: isActive ? 1 : 0.2 }}>
              <div className="w-8 h-8 rounded-full bg-black" />
            </div>
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
