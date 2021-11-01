import React from 'react'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { WizardContext } from '@/app/contexts/WizardContext'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const ConversionsWizardStartingStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = async () => {
    next()
  }

  return (
    <>
      <MarkdownText markdown={copy.startingStepDescription} />
      <Button
        version="green icon"
        onClick={handleNext}
        className="w-full"
        trackComponentName="ConversionsWizardStartingStep"
      >
        Start Running Conversions
        <ArrowAltIcon
          className="ml-3"
          fill={brandColors.white}
          direction="right"
        />
      </Button>
    </>
  )
}

export default ConversionsWizardStartingStep
