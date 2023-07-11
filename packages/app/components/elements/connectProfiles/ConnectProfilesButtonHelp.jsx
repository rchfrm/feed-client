import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import ButtonHelp from '@/elements/ButtonHelp'

import ConnectProfilesConnectMore from '@/app/elements/connectProfiles/ConnectProfilesConnectMore'

import copy from '@/app/copy/connectProfilesCopy'

const ConnectProfilesButtonHelp = ({
  auth,
  errors,
  setErrors,
  isConnecting,
}) => {
  const isDesktopLayout = useBreakpointTest('sm')

  return (
    isDesktopLayout ? (
      <ButtonHelp
        content={copy.helpText}
        text="More info on permissions!"
        label="Connect accounts help"
      />
    ) : (
      <ButtonHelp
        content={(
          <ConnectProfilesConnectMore
            auth={auth}
            errors={errors}
            setErrors={setErrors}
            isConnecting={isConnecting}
            isSidePanel
          />
        )}
        className="text-left"
        text="Can't see the page you're looking for?"
        label="Connect accounts help"
      />
    )
  )
}

ConnectProfilesButtonHelp.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool.isRequired,
}

ConnectProfilesButtonHelp.defaultProps = {
  errors: [],
}

export default ConnectProfilesButtonHelp
