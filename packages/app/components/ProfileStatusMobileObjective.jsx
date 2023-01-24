import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import useControlsStore from '@/app/stores/controlsStore'

import PlayIcon from '@/icons/PlayIcon'

import ProfileStatusMobileBar from '@/app/ProfileStatusMobileBar'

import { getObjectiveString } from '@/app/helpers/artistHelpers'

import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ProfileStatusMobileObjective = ({ backgroundStyle }) => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const objectiveString = getObjectiveString(objective, platform)

  const goToResultsPage = () => {
    Router.push({
      pathname: ROUTES.RESULTS,
    })
  }

  return (
    <ProfileStatusMobileBar
      onClick={goToResultsPage}
      backgroundStyle={backgroundStyle}
      className="bg-green"
    >
      <PlayIcon color={brandColors.offwhite} className="w-2 h-auto mr-2" />
      Driving {objectiveString}
    </ProfileStatusMobileBar>
  )
}

ProfileStatusMobileObjective.propTypes = {
  backgroundStyle: PropTypes.object,
}

ProfileStatusMobileObjective.defaultProps = {
  backgroundStyle: null,
}

export default ProfileStatusMobileObjective
