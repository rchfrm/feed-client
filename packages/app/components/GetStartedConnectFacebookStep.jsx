import React from 'react'
// import PropTypes from 'prop-types'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import ButtonHelp from '@/elements/ButtonHelp'

import copy from '@/app/copy/connectProfilesCopy'
import * as ROUTES from '@/app/constants/routes'

const GetStartedConnectFacebookStep = ({ scopes }) => {
  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      <ConnectFacebookButton
        redirectPath={ROUTES.GET_STARTED}
        scopes={scopes}
        buttonText="Continue with Facebook"
        className="w-96 mb-16"
        trackComponentName="GetStartedConnectFacebookStep"
      />
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
