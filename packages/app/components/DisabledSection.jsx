import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import DisabledActionPrompt from '@/app/DisabledActionPrompt'

import copy from '@/app/copy/controlsPageCopy'

const DisabledSection = ({
  children,
  hasPlanRestriction,
  section,
  className,
}) => {
  const {
    artist: {
      hasSetUpProfile,
    },
  } = React.useContext(ArtistContext)

  const isDisabled = !hasSetUpProfile || hasPlanRestriction

  return (
    <div className={className}>
      {isDisabled && (
        <DisabledActionPrompt
          copy={copy.disabledReason(section, hasSetUpProfile)}
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
  hasPlanRestriction: PropTypes.bool,
  section: PropTypes.string.isRequired,
  className: PropTypes.string,
}

DisabledSection.defaultProps = {
  hasPlanRestriction: false,
  className: null,
}

export default DisabledSection
