import React from 'react'
// import PropTypes from 'prop-types'

import AddPaymentForm from '@/app/AddPaymentForm'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/controlsPageCopy'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

const ControlsWizardPaymentStep = () => {
  const [addPaymentMethod, setAddPaymentMethod] = React.useState(() => {})
  const [isLoading, setIsLoading] = React.useState(false)

  const savePaymentMethod = async () => {
    setIsLoading(true)
    await addPaymentMethod()
    setIsLoading(false)
  }
  return (
    <>
      <MarkdownText markdown={copy.controlsWizardPaymentStepIntro} />
      <AddPaymentForm setAddPaymentMethod={setAddPaymentMethod} />
      <Button
        version="outline-green icon"
        onClick={savePaymentMethod}
        spinnerFill={brandColors.black}
        className="w-full mb-10"
        loading={isLoading}
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
