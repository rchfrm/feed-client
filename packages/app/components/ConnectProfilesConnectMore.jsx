import React from 'react'
import PropTypes from 'prop-types'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'

import MissingScopesMessage from '@/elements/MissingScopesMessage'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import copy from '@/app/copy/connectProfilesCopy'

const ConnectProfilesConnectMore = ({
  auth,
  errors,
  setErrors,
}) => {
  const { missingScopes: { account: missingScopes } } = auth

  return (
    <>
      {errors.map((error, index) => {
        return <Error error={error} messagePrefix="Error: " key={index} className="mb-10" />
      })}

      {missingScopes.length > 0 && (
        <MissingScopesMessage
          scopes={missingScopes}
          showButton={false}
        />
      )}

      <MarkdownText className="text-lg font-bold" markdown={copy.connectMoreTitle} />
      <MarkdownText markdown={copy.connectMoreInstructions} className="mb-6" />
      <ConnectFacebookButton
        errors={errors}
        setErrors={setErrors}
        buttonText="Connect more"
        trackComponentName="ConnectProfilesConnectMore"
        className="w-full xs:w-1/2"
      />
    </>
  )
}

ConnectProfilesConnectMore.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
}

ConnectProfilesConnectMore.defaultProps = {
  errors: [],
}

export default ConnectProfilesConnectMore
