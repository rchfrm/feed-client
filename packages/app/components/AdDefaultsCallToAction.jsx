import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import CallToActionSelector from '@/app/CallToActionSelector'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'

import { setDefaultCallToAction } from '@/app/helpers/adDefaultsHelpers'
import { getCallToAction } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const AdDefaultsCallToAction = ({
  defaultCallToAction,
  updatePreferences,
  className,
}) => {
  // Set local state
  const [callToAction, setCallToAction] = React.useState(defaultCallToAction)

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const recommendedCallToAction = getCallToAction(objective, platform)?.name

  const handleSuccess = ({ preferences }) => {
    const { posts: { call_to_action: callToAction } } = preferences
    setCallToAction(callToAction)
    // Update store value
    updatePreferences({
      postsPreferences: {
        callToAction,
      },
    })
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
        className="mb-14"
      />
      {recommendedCallToAction && <ControlsSettingsSectionFooter copy={copy.defaultCallToActionFooter(recommendedCallToAction)} className="text-insta" />}
    </div>
  )
}

AdDefaultsCallToAction.propTypes = {
  defaultCallToAction: PropTypes.string,
  updatePreferences: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AdDefaultsCallToAction.defaultProps = {
  defaultCallToAction: '',
  className: null,
}

export default AdDefaultsCallToAction
