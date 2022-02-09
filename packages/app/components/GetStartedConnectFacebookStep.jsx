import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import ButtonHelp from '@/elements/ButtonHelp'

import copy from '@/app/copy/connectProfilesCopy'
import * as ROUTES from '@/app/constants/routes'

const GetStartedConnectFacebookStep = ({ scopes }) => {
  const { next } = React.useContext(WizardContext)

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
        <button onClick={next}>Next...</button>
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

GetStartedConnectFacebookStep.propTypes = {
}

GetStartedConnectFacebookStep.defaultProps = {
}

export default GetStartedConnectFacebookStep
