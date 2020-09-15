import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import useAsyncEffect from 'use-async-effect'

import Spinner from '@/elements/Spinner'

import TargetingAgeSlider from '@/app/TargetingAgeSlider'
import TargetingLocationsPicker from '@/app/TargetingLocationsPicker'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/contexts/ArtistContext'

import { fetchTargetingCities } from '@/app/helpers/targetingHelpers'

const TargetingSettings = () => {
  // Fetch from targeting context
  const {
    targetingState,
    setTargetingState,
    setCurrentView,
    createLocationOptions,
    settingsReady,
    setSettingsReady,
  } = React.useContext(TargetingContext)

  // Fetch locations options
  const { artistId } = React.useContext(ArtistContext)
  useAsyncEffect(async (isMounted) => {
    const locations = await fetchTargetingCities(artistId)
    if (!isMounted) return
    createLocationOptions(locations)
    setSettingsReady(true)
  }, [])

  if (!settingsReady) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <button
        className="px-10 py-4 bg-black text-white mb-10"
        onClick={() => {
          setCurrentView('summary')
        }}
      >
        BACK
      </button>
      {/* AGE */}
      <TargetingAgeSlider
        className="pb-16"
        minAge={targetingState.minAge}
        maxAge={targetingState.maxAge}
        onChange={([minAge, maxAge]) => {
          setTargetingState((targetingState) => {
            return produce(targetingState, draftState => {
              draftState.minAge = minAge
              draftState.maxAge = maxAge
            })
          })
        }}
      />
      {/* LOCATIONS */}
      <TargetingLocationsPicker />
    </div>
  )
}

TargetingSettings.propTypes = {

}

export default TargetingSettings
