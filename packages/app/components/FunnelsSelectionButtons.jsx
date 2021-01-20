import React from 'react'
import PropTypes from 'prop-types'

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
      <ul>
        {options.map(({ title, id }) => {
          const isActive = id === activeFunnelId
          return (
            <li key={id} className="mb-6">
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
