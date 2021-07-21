import React from 'react'
import PropTypes from 'prop-types'

import CallToActionSelector from '@/app/CallToActionSelector'

import { setDefaultCallToAction } from '@/app/helpers/adDefaultsHelpers'

const AdDefaultsCallToAction = ({
  defaultCallToAction,
  updatePreferences,
  className,
}) => {
  // Set local state
  const [callToAction, setCallToAction] = React.useState(defaultCallToAction)

  const handleSuccess = (newCallToAction) => {
    setCallToAction(newCallToAction)
    // Update store value
    updatePreferences(
      'postsPreferences',
      { callToAction: newCallToAction },
    )
  }

  return (
    <div
      className={[
        'block relative',
        className,
      ].join(' ')}
    >
      <CallToActionSelector
        onSelect={setDefaultCallToAction}
        onSuccess={handleSuccess}
        callToAction={callToAction}
        setCallToAction={setCallToAction}
        shouldSaveOnChange
      />
    </div>
  )
}

AdDefaultsCallToAction.propTypes = {
  defaultCallToAction: PropTypes.string.isRequired,
  updatePreferences: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AdDefaultsCallToAction.defaultProps = {
  className: null,
}

export default AdDefaultsCallToAction
