import React from 'react'
import PropTypes from 'prop-types'
import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import ConnectProfilesSearch from '@/app/ConnectProfilesSearch'
import ButtonHelp from '@/elements/ButtonHelp'
import MissingScopesMessage from '@/elements/MissingScopesMessage'
import Error from '@/elements/Error'
import connectProfilesCopy from '@/app/copy/connectProfilesCopy'
import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/getStartedCopy'

const GetStartedConnectFacebookNoProfiles = ({
  auth,
  errors,
  isCannotListPagesError,
  setIsConnecting,
  setSelectedProfile,
  setErrors,
}) => {
  const { missingScopes: { ads: missingScopes } } = auth

  return (
    <div className="flex flex-1 flex-column">
      {errors.map((error, index) => {
        return <Error error={error} messagePrefix="Error: " key={index} className="mb-10" />
      })}
      {isCannotListPagesError ? (
        <ConnectProfilesSearch
          setSelectedProfile={setSelectedProfile}
          setIsConnecting={setIsConnecting}
          setErrors={setErrors}
          className="w-full sm:w-1/2 mt-6"
        />
      ) : (
        <>
          <h3 className="mb-4 font-medium text-lg">{copy.facebookConnectSubtitle}</h3>
          {missingScopes.length > 0 && (
            <MissingScopesMessage
              scopes={missingScopes}
              showButton={false}
              className="text-grey-3 italic mb-4"
            />
          )}
          <div className="flex flex-1 flex-column justify-center items-center">
            <ConnectFacebookButton
              redirectPath={ROUTES.GET_STARTED}
              buttonText="Continue with Facebook"
              className="w-full sm:w-96 mb-16"
              trackComponentName="GetStartedConnectFacebookNoProfiles"
            />
            <ButtonHelp
              content={connectProfilesCopy.helpText}
              text="The permissions we ask for"
              label="Permissions help"
              trackComponentName="GetStartedConnectFacebookNoProfiles"
            />
          </div>
        </>
      )}
    </div>
  )
}

GetStartedConnectFacebookNoProfiles.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array,
  isCannotListPagesError: PropTypes.bool.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  setSelectedProfile: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
}

GetStartedConnectFacebookNoProfiles.defaultProps = {
  errors: [],
}

export default GetStartedConnectFacebookNoProfiles
