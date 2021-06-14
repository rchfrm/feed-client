import React from 'react'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import { WizardContext } from './contexts/WizardContext'

const ConversionsWizardStartingStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = async () => {
    next()
  }

  return (
    <>
      <h2>Set up Conversions</h2>
      <p>Looks like you haven't set up conversions yet. Start running conversions by clicking the button below.</p>
      <Button
        version="green icon"
        onClick={handleNext}
        className="w-full"
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
