import React from 'react'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'

import ButtonHelp from '@/elements/ButtonHelp'

import copy from '@/app/copy/connectProfilesCopy'
import * as ROUTES from '@/app/constants/routes'

const GetStartedConnectFacebookNoProfiles = ({ scopes }) => {
  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-0 font-medium text-xl">Firstly, connect your Instagram via Facebook.</h3>
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
    </div>
  )
}

GetStartedConnectFacebookNoProfiles.propTypes = {
}

GetStartedConnectFacebookNoProfiles.defaultProps = {
}

export default GetStartedConnectFacebookNoProfiles
