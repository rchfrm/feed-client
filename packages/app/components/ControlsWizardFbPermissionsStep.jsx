import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import * as ROUTES from '@/app/constants/routes'
import brandColors from '@/constants/brandColors'

const ControlsWizardFbPermissionsStep = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    setIsLoading(true)
    setIsLoading(false)
    next()
  }

  return (
    <>
      <p>To be able to runs ads through Feed we need a few additional Facebook permissions from you</p>
      <ConnectFacebookButton
        redirectPath={ROUTES.CONTROLS}
        errors={error}
        setErrors={setError}
        buttonText="Continue with Facebook"
        className="w-full max-w-md mb-12"
        trackComponentName="ControlsWizardFbPermissionsStep"
      />
      <Error error={error} />
      <Button
        version="outline-green"
        onClick={handleNext}
        className="w-1/3 ml-auto mb-12"
        loading={isLoading}
        spinnerFill={brandColors.black}
        trackComponentName="ControlsWizardAdAccountStep"
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

ControlsWizardFbPermissionsStep.propTypes = {
}

export default ControlsWizardFbPermissionsStep
