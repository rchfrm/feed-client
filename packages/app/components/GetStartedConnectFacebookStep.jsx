import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import ButtonFacebook from '@/elements/ButtonFacebook'
import ButtonHelp from '@/elements/ButtonHelp'

import copy from '@/app/copy/connectProfilesCopy'

const GetStartedConnectFacebookStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    next()
  }

  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      <ButtonFacebook
        onClick={handleNext}
        fallbackCta="Continue with Facebook"
        className="w-96 mb-16"
        trackComponentName="GetStartedConnectFacebookStep"
      >
        Continue with Facebook
      </ButtonFacebook>
      <ButtonHelp
        content={copy.helpText}
        text="The permissions we ask for"
        label="Permissions help"
        trackComponentName="GetStartedConnectFacebookStep"
      />
    </div>
  )
}

GetStartedConnectFacebookStep.propTypes = {
}

GetStartedConnectFacebookStep.defaultProps = {
}

export default GetStartedConnectFacebookStep
