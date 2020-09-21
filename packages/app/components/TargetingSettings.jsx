import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import useAsyncEffect from 'use-async-effect'

import Button from '@/elements/Button'
import Spinner from '@/elements/Spinner'

import TargetingAgeSlider from '@/app/TargetingAgeSlider'
import TargetingPickerLocations from '@/app/TargetingPickerLocations'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/contexts/ArtistContext'

import { fetchPopularLocations } from '@/app/helpers/targetingHelpers'

const TargetingSettings = () => {
  // Fetch from targeting context
  const {
    targetingState,
    setTargetingState,
    createLocationOptions,
    settingsReady,
    setSettingsReady,
    cancelUpdateSettings,
  } = React.useContext(TargetingContext)

  // Fetch locations options
  const { artistId } = React.useContext(ArtistContext)
  useAsyncEffect(async (isMounted) => {
    const locations = await fetchPopularLocations(artistId)
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
    <div className="-mt-1">
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
      <TargetingPickerLocations className="mb-16" />
      {/* BACK BUTTON */}
      <div>
        <Button
          className="w-40"
          onClick={cancelUpdateSettings}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

TargetingSettings.propTypes = {

}

export default TargetingSettings
