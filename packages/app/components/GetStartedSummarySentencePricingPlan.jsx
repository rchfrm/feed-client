import React from 'react'

import GetStartedSummarySentenceSection from '@/app/GetStartedSummarySentenceSection'

import { getStartedSections } from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/getStartedCopy'

const GetStartedSummarySentencePricingPlan = () => {
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { pricingPlan: storedPricingPlan } = wizardState || {}
  const isComplete = Boolean(storedPricingPlan)

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.pricingPlan}
      text="on"
      color={brandColors.blue}
      isComplete={isComplete}
      className="mx-1 sm:mx-2"
    >
      {storedPricingPlan ? copy.pricingPlan(storedPricingPlan) : 'a Feed'} tier
    </GetStartedSummarySentenceSection>
  )
}

GetStartedSummarySentencePricingPlan.propTypes = {
}

GetStartedSummarySentencePricingPlan.defaultProps = {
}

export default GetStartedSummarySentencePricingPlan
