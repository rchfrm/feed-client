import React from 'react'
import PropTypes from 'prop-types'
import DisabledActionPrompt from '@/app/DisabledActionPrompt'

const DisabledSection = ({
  children,
  isDisabled,
  section,
  className,
}) => {
  return (
    <div className={className}>
      {isDisabled && (
        <DisabledActionPrompt
          section={section}
          className="mb-5"
        />
      )}
      <div
        className={[isDisabled ? 'pointer-events-none grayscale opacity-20' : null].join(' ')}
      >
        {children}
      </div>
    </div>
  )
}

DisabledSection.propTypes = {
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  section: PropTypes.string.isRequired,
  className: PropTypes.string,
}

DisabledSection.defaultProps = {
  isDisabled: false,
  className: null,
}

export default DisabledSection
