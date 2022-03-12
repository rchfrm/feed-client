import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import TooltipButton from '@/elements/TooltipButton'
import MarkdownText from '@/elements/MarkdownText'
import ToggleSwitch from '@/elements/ToggleSwitch'
import Error from '@/elements/Error'

import copy from '@/app/copy/targetingPageCopy'

const TargetingLocationsSettings = ({
  className,
}) => {
  // Fetch from targeting context
  const {
    targetingState,
    setTargetingState,
  } = React.useContext(TargetingContext)

  const propKey = 'use_location_targeting_for_remind'
  const [useGeographic, setUseGeographic] = React.useState(targetingState[propKey] || false)
  const error = useGeographic ? { message: copy.locationSettingsWarning } : null

  // UPDATE TARGETING STATE
  React.useEffect(() => {
    setTargetingState((targetingState) => {
      return produce(targetingState, draftState => {
        draftState[propKey] = useGeographic
      })
    })
  }, [useGeographic, setTargetingState])

  return (
    <section
      className={[
        className,
      ].join(' ')}
    >
      <div
        className={[
          'bg-grey-1 rounded-dialogue p-4',
          'iphone8:flex items-center justify-between',
          'mb-4',
        ].join(' ')}
      >
        <div className="flex iphone8:items-center mb-4 iphone8:mb-0">
          {/* TOOLTIP */}
          <TooltipButton
            copy={copy.locationSettingsTooltip}
            direction="right"
            trackLabel="Geographical targeting settings"
          />
          {/* TEXT */}
          <MarkdownText markdown={copy.locationSettingsIntro} className="mb-0 ml-2 iphone8:mr-4" />
        </div>
        {/* TOGGLE SWITCH */}
        <div className="mb-0 pl-10 iphone8:pl-0">
          <ToggleSwitch
            state={useGeographic}
            onChange={(newState) => setUseGeographic(newState)}
          />
        </div>
      </div>
      <Error error={error} className="mb-0" />
    </section>
  )
}

TargetingLocationsSettings.propTypes = {
  className: PropTypes.string,
}

TargetingLocationsSettings.defaultProps = {
  className: null,
}

export default TargetingLocationsSettings
