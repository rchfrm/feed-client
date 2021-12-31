import React from 'react'
import PropTypes from 'prop-types'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'

import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import controlsCopy from '@/app/copy/controlsPageCopy'

// import * as ROUTES from '@/app/constants/routes'

const ControlsWizardFbPermissionsStep = ({ scopes }) => {
  const [error, setError] = React.useState(null)

  return (
    <>
      <MarkdownText markdown={controlsCopy.controlsWizardFbPermissionsStepIntro(scopes)} />
      <Error error={error} />
      <ConnectFacebookButton
        // redirectPath={ROUTES.CONTROLS}
        scopes={scopes}
        errors={error}
        setErrors={setError}
        buttonText="Continue with Facebook"
        className="w-full xs:w-72 mx-auto mb-12"
        trackComponentName="ControlsWizardFbPermissionsStep"
      />
    </>
  )
}

ControlsWizardFbPermissionsStep.propTypes = {
  scopes: PropTypes.array.isRequired,
}

export default ControlsWizardFbPermissionsStep
