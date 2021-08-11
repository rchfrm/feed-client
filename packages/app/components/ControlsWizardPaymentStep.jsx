import React from 'react'
// import PropTypes from 'prop-types'

import AddPaymentForm from '@/app/AddPaymentForm'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import { UserContext } from '@/app/contexts/UserContext'

import copy from '@/app/copy/controlsPageCopy'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'
import next from 'next'

const ControlsWizardPaymentStep = () => {
  const [addPaymentMethod, setAddPaymentMethod] = React.useState(() => {})
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const { user: { organizations } } = React.useContext(UserContext)
  const organisationId = Object.values(organizations).find((organisation) => organisation.role === 'owner')?.id

  // GO TO NEXT STEP on SUCCESS
  React.useEffect(() => {
    if (success) {
      next()
    }
  }, [success])

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardPaymentStepIntro} />
      <AddPaymentForm
        organisationId={organisationId}
        setAddPaymentMethod={setAddPaymentMethod}
        setSuccess={setSuccess}
        shouldBeDefault
        isFormValid={isFormValid}
        setIsFormValid={setIsFormValid}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Button
        version="outline-green icon"
        onClick={addPaymentMethod}
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
