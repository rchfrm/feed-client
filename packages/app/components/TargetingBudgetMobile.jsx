import React from 'react'
import PropTypes from 'prop-types'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'
import TargetingCustomBudgetButton from '@/app/TargetingCustomBudgetButton'

import { ArtistContext } from '@/app/contexts/ArtistContext'

// Content for the side panel
const TargetingBudgetMobile = ({
  minReccBudget,
  initialBudget,
  targetingState,
  updateTargetingBudget,
}) => {
  // ARTIST context
  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
        minorUnit: {
          minBase,
          minHard: minHardBudget,
        },
      },
    },
  } = React.useContext(ArtistContext)
  // TOGGLE CUSTOM BUDGET SETTER
  // Show custom budget input if budget is higher than max slider value
  // GET SLIDER SETTINGS BASED ON MIN BUDGET
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)
  return (
    <div>
      {/* HEADER */}
      <header className="-mt-2">
        <h3 className="h2">Set a Daily Budget</h3>
      </header>
      <div className="absolute--center-y left-0 w-full px-10" style={{ bottom: '50%' }}>
        <div className="flex justify-end">
          <TargetingCustomBudgetButton
            className="mb-3"
            showCustomBudget={showCustomBudget}
            setShowCustomBudget={setShowCustomBudget}
            initialBudget={initialBudget}
            minBase={minBase}
            minHardBudget={minHardBudget}
          />
        </div>
        <TargetingBudgetSetter
          currency={currencyCode}
          currencyOffset={currencyOffset}
          minBase={minBase}
          minReccBudget={minReccBudget}
          minHardBudget={minHardBudget}
          initialBudget={initialBudget}
          targetingState={targetingState}
          updateTargetingBudget={updateTargetingBudget}
          showCustomBudget={showCustomBudget}
          mobileVersion
        />
      </div>
    </div>
  )
}

TargetingBudgetMobile.propTypes = {
  minReccBudget: PropTypes.number.isRequired,
  initialBudget: PropTypes.number.isRequired,
  targetingState: PropTypes.object.isRequired,
  updateTargetingBudget: PropTypes.func.isRequired,
}

TargetingBudgetMobile.defaultProps = {
}


export default TargetingBudgetMobile
