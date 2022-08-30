import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const TargetingBudgetPauseAlertShortSpendingPeriod = ({
  budget,
  spendingData,
  setShouldShowShortSpendingPeriodWarning,
  setButtons,
  closeAlert,
}) => {
  const { artist: { feedMinBudgetInfo } } = React.useContext(ArtistContext)
  const {
    minorUnit: {
      minHard,
      minRecommendedStories,
    } = {},
  } = feedMinBudgetInfo

  const { daysOfSpending } = spendingData || {}
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  const hasMinimumBudget = (!hasSalesObjective && budget === minHard) || (hasSalesObjective && budget <= minRecommendedStories)
  const alertCopy = copy.shortSpendingPeriodWarning(daysOfSpending, hasMinimumBudget)

  React.useEffect(() => {
    const buttons = [
      {
        text: 'Pause Spending',
        onClick: () => {
          setShouldShowShortSpendingPeriodWarning(false)
        },
        color: 'red',
        shouldCloseOnConfirm: false,
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]

    setButtons(buttons)
  }, [closeAlert, setButtons, setShouldShowShortSpendingPeriodWarning])

  return (
    <MarkdownText markdown={alertCopy} />
  )
}

TargetingBudgetPauseAlertShortSpendingPeriod.propTypes = {
}

TargetingBudgetPauseAlertShortSpendingPeriod.defaultProps = {
}

export default TargetingBudgetPauseAlertShortSpendingPeriod
