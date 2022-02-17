import React from 'react'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'

import ButtonHelp from '@/elements/ButtonHelp'
import MarkdownText from '@/elements/MarkdownText'

import connectProfilesCopy from '@/app/copy/connectProfilesCopy'
import * as ROUTES from '@/app/constants/routes'

import copy from '@/app/copy/getStartedCopy'

const GetStartedConnectFacebookNoProfiles = ({ scopes }) => {
  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-4 font-medium text-xl">{copy.facebookConnectSubtitle}</h3>
      <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.facebookConnectDescription} />
      <div className="flex flex-1 flex-column justify-center items-center">
        <ConnectFacebookButton
          redirectPath={ROUTES.CONTROLS}
          scopes={scopes}
          buttonText="Continue with Facebook"
          className="w-full sm:w-96 mb-16"
          trackComponentName="GetStartedConnectFacebookStep"
        />
        <ButtonHelp
          content={connectProfilesCopy.helpText}
          text="The permissions we ask for"
          label="Permissions help"
          trackComponentName="GetStartedConnectFacebookStep"
          className="mb-5 sm:mb-0"
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
