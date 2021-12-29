import React from 'react'
import PropTypes from 'prop-types'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'

import Error from '@/elements/Error'

// import * as ROUTES from '@/app/constants/routes'

const ControlsWizardFbPermissionsStep = ({ scopes }) => {
  const [error, setError] = React.useState(null)

  return (
    <>
      <p className="mb-12">To be able to runs ads through Feed we need a few additional Facebook permissions from you.</p>
      <Error error={error} />
      <ConnectFacebookButton
        // redirectPath={ROUTES.CONTROLS}
        scopes={scopes}
        errors={error}
        setErrors={setError}
        buttonText="Continue with Facebook"
        className="w-full xs:w-72 ml-auto mb-12"
        trackComponentName="ControlsWizardFbPermissionsStep"
      />
    </>
  )
}

ControlsWizardFbPermissionsStep.propTypes = {
  scopes: PropTypes.array.isRequired,
}

export default ControlsWizardFbPermissionsStep
