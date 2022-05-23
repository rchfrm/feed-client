import React from 'react'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import GetStartedSummarySentenceSection from '@/app/GetStartedSummarySentenceSection'

import useControlsStore from '@/app/stores/controlsStore'

import { formatCurrency } from '@/helpers/utils'
import { getStartedSections } from '@/app/helpers/artistHelpers'
import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  budget: state.budget,
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedSummarySentenceTargeting = () => {
  const { artist } = React.useContext(ArtistContext)

  const {
    feedMinBudgetInfo: {
      currencyCode,
      majorUnit: {
        minRecommendedStories,
      } = {},
    },
  } = artist

  const { budget, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'
  const isComplete = (!hasSalesObjective && Boolean(budget)) || (hasSalesObjective && budget >= minRecommendedStories)

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.targeting}
      text="with a daily budget of"
      color={brandColors.green}
      isComplete={isComplete}
      className="ml-2"
    >
      {formatCurrency(budget || 5, currencyCode)}
    </GetStartedSummarySentenceSection>
  )
}

GetStartedSummarySentenceTargeting.propTypes = {
}

GetStartedSummarySentenceTargeting.defaultProps = {
}

export default GetStartedSummarySentenceTargeting
