import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Input from '@/elements/Input'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const ControlsWizardLinkStep = () => {
  const { next } = React.useContext(WizardContext)

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardLinkStepIntro} />
      <Input
        placeholder="https://"
        type="url"
        version="box"
        name="link-url"
        value=""
      />
      <Button
        version="green icon"
        onClick={next}
        className="w-full mb-6"
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          fill={brandColors.white}
          direction="right"
        />
      </Button>
      <MarkdownText markdown={copy.controlsWizardLinkStepOutro} />
    </>
  )
}

ControlsWizardLinkStep.propTypes = {
}

export default ControlsWizardLinkStep
