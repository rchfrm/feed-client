import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Input from '@/elements/Input'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const ControlsWizardPaymentStep = () => {
  const { next } = React.useContext(WizardContext)

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardPaymentStepIntro} />
      <Input
        placeholder="Name on card"
        type="text"
        version="box"
        name="card-name"
        value=""
      />
      <Input
        placeholder="Card number"
        type="text"
        version="box"
        name="card-number"
        value=""
      />
      <Button
        version="outline icon"
        onClick={next}
        spinnerFill={brandColors.black}
        className="w-full"
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

ControlsWizardPaymentStep.propTypes = {
}

export default ControlsWizardPaymentStep
