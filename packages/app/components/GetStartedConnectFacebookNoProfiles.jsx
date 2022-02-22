import React from 'react'
import PropTypes from 'prop-types'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'

import ButtonHelp from '@/elements/ButtonHelp'
import MarkdownText from '@/elements/MarkdownText'
import MissingScopesMessage from '@/elements/MissingScopesMessage'
import Error from '@/elements/Error'

import connectProfilesCopy from '@/app/copy/connectProfilesCopy'
import * as ROUTES from '@/app/constants/routes'

import copy from '@/app/copy/getStartedCopy'

const GetStartedConnectFacebookNoProfiles = ({ auth, error }) => {
  const { missingScopes: { ads: missingScopes } } = auth

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-4 font-medium text-xl">{copy.facebookConnectSubtitle}</h3>
      {missingScopes.length > 0 ? (
        <MissingScopesMessage
          scopes={missingScopes}
          showButton={false}
          className="text-grey-3 italic mb-4"
        />
      ) : (
        <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.facebookConnectDescription} />
      )}
      <Error error={error} />
      <div className="flex flex-1 flex-column justify-center items-center">
        <ConnectFacebookButton
          redirectPath={ROUTES.CONTROLS}
          buttonText="Continue with Facebook"
          className="w-full sm:w-96 mb-16"
          trackComponentName="GetStartedConnectFacebookNoProfiles"
        />
        <ButtonHelp
          content={connectProfilesCopy.helpText}
          text="The permissions we ask for"
          label="Permissions help"
          trackComponentName="GetStartedConnectFacebookNoProfiles"
          className="mb-5 sm:mb-0"
        />
      </div>
    </div>
  )
}

GetStartedConnectFacebookNoProfiles.propTypes = {
  error: PropTypes.object,
}

GetStartedConnectFacebookNoProfiles.defaultProps = {
  error: null,
}

export default GetStartedConnectFacebookNoProfiles
