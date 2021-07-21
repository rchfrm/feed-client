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

  const handleSuccess = ({ preferences }) => {
    const { posts: { call_to_action: callToAction } } = preferences
    setCallToAction(callToAction)
    // Update store value
    updatePreferences(
      'postsPreferences',
      { callToAction },
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
