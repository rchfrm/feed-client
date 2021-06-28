import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { WizardContext } from '@/app/contexts/WizardContext'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const ConversionsWizardStartingStep = ({ setIsWizardActive }) => {
  const { next } = React.useContext(WizardContext)

  React.useEffect(() => {
    setIsWizardActive(true)
  }, [setIsWizardActive])

  const handleNext = async () => {
    next()
  }

  return (
    <>
      <h2>Set up Conversions</h2>
      <MarkdownText markdown={copy.startingStepDescription} />
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

ConversionsWizardStartingStep.propTypes = {
  setIsWizardActive: PropTypes.func.isRequired,
}

export default ConversionsWizardStartingStep
