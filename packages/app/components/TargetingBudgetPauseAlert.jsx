import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'
import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { track } from '@/helpers/trackingHelpers'
import copy from '@/app/copy/targetingPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const TargetingBudgetPauseAlert = ({
  isPaused,
  togglePauseCampaign,
  budget,
  spendingData,
  currency,
  closeAlert,
}) => {
  const { setButtons } = useAlertModal()

  const { hasSpentConsecutivelyLessThan30Days, daysOfSpending } = spendingData || {}
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  const { artist: { feedMinBudgetInfo } } = React.useContext(ArtistContext)
  const {
    minorUnit: {
      minHard,
      minRecommendedStories,
    } = {},
  } = feedMinBudgetInfo

  const isPausedWithShortSpendingPeriod = !isPaused && hasSpentConsecutivelyLessThan30Days
  const hasMinimumBudget = (!hasSalesObjective && budget === minHard) || (hasSalesObjective && budget <= minRecommendedStories)
  const alertCopy = copy.shortSpendingPeriodWarning(daysOfSpending, hasMinimumBudget)

  console.log(isPausedWithShortSpendingPeriod)
  console.log(alertCopy)

  React.useEffect(() => {
    const buttons = [
      {
        text: isPaused ? 'Resume Spending' : 'Pause Spending',
        onClick: () => {
          togglePauseCampaign()

          const action = isPaused ? 'resume_spending' : 'pause_spending'
          track(action, {
            budget,
            currency,
          })
        },
        color: isPaused ? 'green' : 'red',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]

    setButtons(buttons)
  }, [isPaused, closeAlert, setButtons, togglePauseCampaign, budget, currency])

  return (
    <p>{isPaused ? 'Resume' : 'Pause'} spending?</p>
  )
}

TargetingBudgetPauseAlert.propTypes = {
}

TargetingBudgetPauseAlert.defaultProps = {
}

export default TargetingBudgetPauseAlert
