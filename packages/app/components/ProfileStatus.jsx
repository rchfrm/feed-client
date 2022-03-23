import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  profileSetupStatus: state.profileSetupStatus,
})

const ProfileStatus = ({ className }) => {
  const { profileSetupStatus } = useControlsStore(getControlsStoreState)

  const goToGetStartedPage = () => {
    Router.push({
      pathname: ROUTES.GET_STARTED,
    })
  }

  if (!profileSetupStatus) return null

  return (
    <div className={[className].join(' ')}>
      <button
        className="mb-0 border-2 border-solid border-black rounded-full py-2 px-3"
        onClick={goToGetStartedPage}
      >
        {copy.profileStatus(profileSetupStatus)}
      </button>
    </div>
  )
}

ProfileStatus.propTypes = {
  className: PropTypes.string,
}

ProfileStatus.defaultProps = {
  className: '',
}


export default ProfileStatus
