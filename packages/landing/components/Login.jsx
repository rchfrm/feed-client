import React from 'react'
import PropTypes from 'prop-types'

import copy from '@/landing/copy/LandingPageCopy'
import ButtonNew from '@/elements/ButtonNew'

import { mixpanelExternalLinkClick } from '@/landing/helpers/mixpanelHelpers'

// Global info store
import useGlobalInfoStore from '@/landing/store/globalInfoStore'

const getLoginLink = (state) => state.loginLink

export default function Login({ className, trackLocation }) {
  const loginLink = useGlobalInfoStore(getLoginLink)

  return (
    <div className={className}>
      <ButtonNew
        version="text"
        onClick={() => {
          mixpanelExternalLinkClick(loginLink, { location: trackLocation })
        }}
        trackComponentName="Login"
      >
        {copy.navigation.secondaryCTAText}
      </ButtonNew>
    </div>
  )
}

Login.propTypes = {
  className: PropTypes.string,
  trackLocation: PropTypes.string,
}

Login.defaultProps = {
  className: '',
  trackLocation: '',
}
