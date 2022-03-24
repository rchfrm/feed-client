import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import useControlsStore from '@/app/stores/controlsStore'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import ProfileStatusMobileBar from '@/app/ProfileStatusMobileBar'

import copy from '@/app/copy/getStartedCopy'
import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  profileSetupStatus: state.profileSetupStatus,
})

const ProfileStatusMobileSetupState = ({ backgroundStyle }) => {
  const { profileSetupStatus } = useControlsStore(getControlsStoreState)

  const goToGetStartedPage = () => {
    Router.push({
      pathname: ROUTES.GET_STARTED,
    })
  }

  return (
    <ProfileStatusMobileBar
      onClick={goToGetStartedPage}
      backgroundStyle={backgroundStyle}
      className="bg-insta"
    >
      {copy.profileStatus(profileSetupStatus)}
      <ArrowAltIcon
        className="ml-2 w-3"
        fill={brandColors.white}
        direction="right"
      />
    </ProfileStatusMobileBar>
  )
}

ProfileStatusMobileSetupState.propTypes = {
  backgroundStyle: PropTypes.object,
}

ProfileStatusMobileSetupState.defaultProps = {
  backgroundStyle: null,
}

export default ProfileStatusMobileSetupState
