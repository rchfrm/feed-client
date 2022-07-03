import React from 'react'

import GetStartedSummarySentenceSection from '@/app/GetStartedSummarySentenceSection'

import { getStartedSections } from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/getStartedCopy'

const GetStartedSummarySentencePricingTier = () => {
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { pricingTier: storedPricingTier } = wizardState || {}
  const isComplete = Boolean(storedPricingTier)

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.pricingTier}
      text="on"
      color={brandColors.blue}
      isComplete={isComplete}
      className="mx-1 sm:mx-2"
    >
      {storedPricingTier ? copy.pricingTier(storedPricingTier) : 'a Feed'} tier
    </GetStartedSummarySentenceSection>
  )
}

GetStartedSummarySentencePricingTier.propTypes = {
}

GetStartedSummarySentencePricingTier.defaultProps = {
}

export default GetStartedSummarySentencePricingTier
