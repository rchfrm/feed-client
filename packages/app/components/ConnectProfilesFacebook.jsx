// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT ELEMENTS
import MissingScopesMessage from '@/elements/MissingScopesMessage'
import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/connectProfilesCopy'

const getIntroText = (isFindMore) => {
  if (isFindMore) return copy.findMoreProfiles
  return copy.connectProfilesIntro
}

const ConnectProfilesFacebook = ({
  auth,
  errors,
  setErrors,
  isFindMore,
  className,
}) => {
  const { missingScopes } = auth
  const introText = getIntroText(isFindMore)
  const buttonText = isFindMore ? 'Connect more pages' : 'Continue with Facebook'

  return (
    <div className={className}>
      {/* Errors */}
      {errors.map((error, index) => {
        return <Error error={error} messagePrefix="Error: " key={index} className="mb-10" />
      })}
      <div>
        <MarkdownText markdown={introText} />
        {/* If missing FB permissions, show missing permissions */}
        {missingScopes.length > 0 && (
          <MissingScopesMessage
            scopes={missingScopes}
            showButton={false}
          />
        )}
        {isFindMore && (
          <MarkdownText className="mb-12" markdown={copy.connectProfilesDescription(isFindMore)} />
        )}
        <ConnectFacebookButton
          errors={errors}
          setErrors={setErrors}
          buttonText={buttonText}
          className="w-full max-w-md mb-12"
          trackComponentName="ConnectProfilesFacebook"
        />
        {!isFindMore && (
          <MarkdownText className="mb-12" markdown={copy.connectProfilesDescription(isFindMore)} />
        )}
      </div>
    </div>
  )
}

ConnectProfilesFacebook.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  isFindMore: PropTypes.bool,
  className: PropTypes.string,
}

ConnectProfilesFacebook.defaultProps = {
  errors: [],
  isFindMore: false,
  className: null,
}

export default ConnectProfilesFacebook
