import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import { getObjectiveString } from '@/app/helpers/artistHelpers'
import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/global'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
  isSpendingPaused: state.isSpendingPaused,
})

const SplitViewOptionsItem = ({
  option,
  isActive,
  isLast,
  goToSpecificSetting,
}) => {
  const { name, title, hasDefaultSidePanelButton = true, hasDescription } = option

  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
      },
      hasSetUpProfile,
    },
  } = React.useContext(ArtistContext)

  const { initialTargetingState } = React.useContext(TargetingContext)
  const formattedBudget = formatCurrency(initialTargetingState.budget / currencyOffset, currencyCode)

  const { optimizationPreferences, isSpendingPaused } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const objectiveString = getObjectiveString(objective, platform)

  return (
    <a
      role="button"
      className={[
        'flex items-center no-underline',
        'p-4',
        ! isLast && ! isActive ? 'border-solid border-grey-light border-b-2' : null,
        isActive ? 'bg-insta text-offwhite' : null,
      ].join(' ')}
      onClick={() => goToSpecificSetting(name, hasDefaultSidePanelButton)}
    >
      {/* TITLE */}
      <div className={[
        'relative w-8 h-8',
        'flex justify-center items-center mr-4',
        'shrink-0',
        'rounded-full',
        'border border-solid border-black bg-white',
      ].join(' ')}
      >
        {isActive && <span className="w-4 h-4 block rounded-full bg-green" />}
      </div>
      <div>
        <p className={['font-bold', hasDescription ? 'mb-2' : 'mb-0'].join(' ')}>{title}</p>
        {hasDescription && <p className="mb-0">{copy.splitViewOptionsDescription(name, hasSetUpProfile, objectiveString, isSpendingPaused, formattedBudget)}</p>}
      </div>
    </a>
  )
}

SplitViewOptionsItem.propTypes = {
  option: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  goToSpecificSetting: PropTypes.func.isRequired,
}

SplitViewOptionsItem.defaultProps = {
}

export default SplitViewOptionsItem
