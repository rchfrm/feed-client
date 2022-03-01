import React from 'react'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import GetStartedSummarySentenceSection from '@/app/GetStartedSummarySentenceSection'

import useControlsStore from '@/app/stores/controlsStore'

import { formatCurrency } from '@/helpers/utils'
import { getStartedSections } from '@/app/helpers/artistHelpers'

const getControlsStoreState = (state) => ({
  budget: state.budget,
})

const GetStartedSummarySentenceTargeting = () => {
  const { artist } = React.useContext(ArtistContext)
  const { budget } = useControlsStore(getControlsStoreState)

  const { feedMinBudgetInfo: { currencyCode } } = artist

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.targeting}
      text="with a daily budget of"
      isComplete={Boolean(budget)}
      color="green"
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