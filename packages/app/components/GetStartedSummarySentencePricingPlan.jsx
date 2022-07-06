import React from 'react'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import GetStartedSummarySentenceSection from '@/app/GetStartedSummarySentenceSection'

import { getStartedSections } from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/getStartedCopy'

const GetStartedSummarySentencePricingPlan = () => {
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { artist } = React.useContext(ArtistContext)
  const { pricingPlan: storedPricingPlan } = wizardState || {}

  const plan = artist?.plan || storedPricingPlan
  const isComplete = Boolean(plan)

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.pricingPlan}
      text="on"
      color={brandColors.blue}
      isComplete={isComplete}
      className="mx-1 sm:mx-2"
    >
      {plan ? copy.pricingPlan(plan) : 'a Feed'} tier
    </GetStartedSummarySentenceSection>
  )
}

GetStartedSummarySentencePricingPlan.propTypes = {
}

GetStartedSummarySentencePricingPlan.defaultProps = {
}

export default GetStartedSummarySentencePricingPlan
