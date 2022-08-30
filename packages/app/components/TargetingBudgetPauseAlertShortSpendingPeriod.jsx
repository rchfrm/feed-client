import React from 'react'
import PropTypes from 'prop-types'

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

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  const { daysOfSpending } = spendingData || {}
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
  budget: PropTypes.number.isRequired,
  spendingData: PropTypes.shape({
    hasSpentConsecutivelyLessThan30Days: PropTypes.bool.isRequired,
    daysOfSpending: PropTypes.number.isRequired,
  }).isRequired,
  setShouldShowShortSpendingPeriodWarning: PropTypes.func.isRequired,
  setButtons: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
}

TargetingBudgetPauseAlertShortSpendingPeriod.defaultProps = {
}

export default TargetingBudgetPauseAlertShortSpendingPeriod
