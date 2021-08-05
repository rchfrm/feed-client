import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import CloseCircle from '@/icons/CloseCircle'
import TickCircleIcon from '@/icons/TickCircleIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const ControlsWizardPostsStep = () => {
  const { next } = React.useContext(WizardContext)

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardPostsStepIntro} />
      <div className="flex mb-10">
        <Button
          version="outline-black small"
          onClick={next}
          className="mr-6 border-black"
        >
          <CloseCircle
            fill={brandColors.red}
            className="w-6 h-6 mr-2"
          />
          No
        </Button>
        <Button
          version="outline-black small"
          onClick={next}
          className="border-black"
        >
          <TickCircleIcon
            className="w-6 h-6 mr-2"
          />
          Yes
        </Button>
      </div>
    </>
  )
}

ControlsWizardPostsStep.propTypes = {
}

export default ControlsWizardPostsStep
