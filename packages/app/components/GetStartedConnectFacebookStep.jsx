import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import ButtonFacebook from '@/elements/ButtonFacebook'

const GetStartedConnectFacebookStep = () => {
  const { next } = React.useContext(WizardContext)

  const handleNext = () => {
    next()
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <ButtonFacebook
        onClick={handleNext}
        fallbackCta="Continue with Facebook"
      >
        Continue with Facebook
      </ButtonFacebook>
    </div>
  )
}

GetStartedConnectFacebookStep.propTypes = {
}

GetStartedConnectFacebookStep.defaultProps = {
}

export default GetStartedConnectFacebookStep
