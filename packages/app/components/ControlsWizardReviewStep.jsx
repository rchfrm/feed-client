import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const ControlsWizardReviewStep = () => {
  const { next } = React.useContext(WizardContext)

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardReviewStepIntro} />
      <Button
        version="green icon"
        onClick={next}
        spinnerFill={brandColors.white}
        className="w-full"
      >
        Review Posts
        <ArrowAltIcon
          className="ml-3"
          fill={brandColors.white}
          direction="right"
        />
      </Button>
    </>
  )
}

ControlsWizardReviewStep.propTypes = {
}

export default ControlsWizardReviewStep
