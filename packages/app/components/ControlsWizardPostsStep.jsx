import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const ControlsWizardPostsStep = () => {
  const { next } = React.useContext(WizardContext)

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardPostsStepIntro} />
      <Button
        version="outline icon"
        onClick={next}
        spinnerFill={brandColors.black}
        className="w-full mb-10"
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
    </>
  )
}

ControlsWizardPostsStep.propTypes = {
}

export default ControlsWizardPostsStep
