import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import GetStartedSummarySentenceObjective from '@/app/GetStartedSummarySentenceObjective'
import GetStartedSummarySentencePricingPlan from '@/app/GetStartedSummarySentencePricingPlan'
import GetStartedSummarySentencePosts from '@/app/GetStartedSummarySentencePosts'
import GetStartedSummarySentenceAdAccount from '@/app/GetStartedSummarySentenceAdAccount'
import GetStartedSummarySentenceTargeting from '@/app/GetStartedSummarySentenceTargeting'

const GetStartedSummarySentence = ({ className }) => {
  const { steps, currentStep } = React.useContext(WizardContext)
  const lastStep = steps.length - 1
  const isLastStep = currentStep === lastStep
  const isDesktopLayout = useBreakpointTest('xs')

  const { artist: { hasLegacyPlan } } = React.useContext(ArtistContext)

  return (
    <>
      <div className={[
        'flex items-center',
        'sm:mr-0 mb-10 mt-15 md:mt-0 leading-snug',
        isLastStep && ! isDesktopLayout ? 'flex-column' : 'flex-wrap',
        className,
      ].join(' ')}
      >
        <GetStartedSummarySentenceObjective />
        {! hasLegacyPlan && <GetStartedSummarySentencePricingPlan />}
        <GetStartedSummarySentencePosts />
        <GetStartedSummarySentenceAdAccount />
        <GetStartedSummarySentenceTargeting />
      </div>
    </>
  )
}

GetStartedSummarySentence.propTypes = {
  className: PropTypes.string,
}

GetStartedSummarySentence.defaultProps = {
  className: null,
}

export default GetStartedSummarySentence
