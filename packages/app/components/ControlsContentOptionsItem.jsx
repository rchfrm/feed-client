import React from 'react'
import PropTypes from 'prop-types'

const ControlsContentOptionsItem = ({
  option,
  isActive,
  isLast,
  goToSpecificSetting,
}) => {
  const { title, description, key } = option

  return (
    <a
      role="button"
      className={[
        'flex items-center no-underline',
        'p-4',
        !isLast && !isActive ? 'border-solid border-grey-1 border-b-2' : null,
        isActive ? 'bg-insta text-white' : null,
      ].join(' ')}
      onClick={() => goToSpecificSetting(key)}
    >
      {/* TITLE */}
      <div className={[
        'relative w-8 h-8',
        'flex justify-center items-center mr-4',
        'flex-shrink-0',
        'rounded-full',
        'border border-solid border-black bg-white',
        // isActive && 'bg-green',
      ].join(' ')}
      >
        {isActive && <span className="w-4 h-4 block rounded-full bg-green" />}
      </div>
      <div>
        <p className="font-bold mb-2">{title}</p>
        <p className="mb-0">{description}</p>
      </div>
    </a>
  )
}

ControlsContentOptionsItem.propTypes = {
  option: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  goToSpecificSetting: PropTypes.func.isRequired,
}

ControlsContentOptionsItem.defaultProps = {
}

export default ControlsContentOptionsItem
