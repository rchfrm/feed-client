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
    },
  } = artist

  const { budget } = useControlsStore(getControlsStoreState)
  const isComplete = Boolean(budget)

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.targeting}
      text="with a daily budget of"
      color={brandColors.green}
      isComplete={isComplete}
      className="ml-1 sm:ml-2"
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
