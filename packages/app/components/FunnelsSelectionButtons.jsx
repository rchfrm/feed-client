import React from 'react'
import PropTypes from 'prop-types'

import EyeIcon from '@/icons/EyeIcon'

const FunnelsSelectionButtons = ({
  options,
  activeFunnelId,
  setActiveFunnelId,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* ICONS */}
      <div className="mb-4">
        <EyeIcon className="w-6 h-auto" />
      </div>
      {/* BUTTONS */}
      <ul
        className="pt-4 border-t-2 border-solid border-black"
        style={{ paddingLeft: '0.1rem' }}
      >
        {options.map(({ title, id }) => {
          const isActive = id === activeFunnelId
          return (
            <li
              key={id}
              className={[
                'mb-4 pb-3',
                'border-b-2 border-solid border-black',
              ].join(' ')}
            >
              <button
                className="flex items-start"
                aria-label={`View ${title}`}
                onClick={() => {
                  setActiveFunnelId(id)
                }}
              >
                <div className={['radio--button_label', isActive ? '-active' : null].join(' ')} />
                <p
                  className={[
                    'font-bold text-lg',
                    'mb-0 ml-4',
                  ].join(' ')}
                  style={{ transform: 'translateY(-0.12em)' }}
                >
                  {title}
                </p>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

FunnelsSelectionButtons.propTypes = {
  options: PropTypes.array.isRequired,
  activeFunnelId: PropTypes.string.isRequired,
  setActiveFunnelId: PropTypes.func.isRequired,
  className: PropTypes.string,
}

FunnelsSelectionButtons.defaultProps = {
  className: null,
}

export default FunnelsSelectionButtons
