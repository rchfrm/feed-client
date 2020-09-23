import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import useAsyncEffect from 'use-async-effect'

import Button from '@/elements/Button'
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import TargetingAgeSlider from '@/app/TargetingAgeSlider'
import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingPickerLocations from '@/app/TargetingPickerLocations'
import TargetingBudgetBox from '@/app/TargetingBudgetBox'
import TargetingGenderSelector from '@/app/TargetingGenderSelector'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/contexts/ArtistContext'

import { fetchPopularLocations } from '@/app/helpers/targetingHelpers'

const TargetingSettings = () => {
  // Fetch from targeting context
  const {
    isDesktopLayout,
    targetingState,
    setTargetingState,
    createLocationOptions,
    settingsReady,
    setSettingsReady,
    disableSaving,
    saveCampaignSettings,
    cancelUpdateSettings,
  } = React.useContext(TargetingContext)

  // Fetch locations options
  const [errorFetchingLocations, setErrorFetchingLocations] = React.useState(null)
  const { artistId } = React.useContext(ArtistContext)
  useAsyncEffect(async (isMounted) => {
    const { popularLocations, error } = await fetchPopularLocations(artistId)
    if (!isMounted) return
    if (error) {
      setErrorFetchingLocations(error)
    } else {
      setErrorFetchingLocations(null)
      createLocationOptions(popularLocations)
    }
    setSettingsReady(true)
  }, [])

  // Desktop Budget anchor
  const containerRef = React.useRef(null)
  const columnRef = React.useRef(null)

  if (!settingsReady) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div ref={containerRef}>
      <div className="relative md:w-1/2">
        {/* Anchor for resizing desktop budget */}
        <div
          ref={columnRef}
          className="absolute top-0 left-0 h-10 w-full invisible bg-red pointer-events-none"
        />
        {/* AGE */}
        <TargetingAgeSlider
          className="pb-20"
          ageMin={targetingState.age_min}
          ageMax={targetingState.age_max}
          onChange={([ageMin, ageMax]) => {
            setTargetingState((targetingState) => {
              return produce(targetingState, draftState => {
                draftState.age_min = ageMin
                draftState.age_max = ageMax
              })
            })
          }}
        />
        {/* GENDER */}
        <TargetingGenderSelector
          className="mb-16"
          genders={targetingState.genders}
          onChange={(state) => {
            setTargetingState((targetingState) => {
              return produce(targetingState, draftState => {
                draftState.genders = state
              })
            })
          }}
        />
        {/* LOCATIONS */}
        {errorFetchingLocations ? (
          <div>
            <TargetingSectionHeader className="mb-3" header="Locations" />
            <p>Could not fetch popular locations</p>
            <Error error={errorFetchingLocations} />
          </div>
        ) : (
          <TargetingPickerLocations className="mb-3" />
        )}
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
      {/* DESKTOP BUDGET SETTER */}
      {isDesktopLayout && (
        <>
          <TargetingBudgetBox
            isFixed
            containerRef={containerRef}
            columnRef={columnRef}
          />
          <div
            className={[
              'fixed bottom-0 right-0 w-1/2',
              'pl-20 pr-14 pb-10',
              disableSaving ? 'border-r-0 border-l-0 border-b-0 border-t-2' : 'border-0',
            ].join(' ')}
          >
            <Button
              version="green"
              className="w-full"
              onClick={() => saveCampaignSettings(targetingState)}
              disabled={disableSaving}
            >
              {disableSaving ? 'Budget is too small' : 'Save Campaign Settings'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

TargetingSettings.propTypes = {

}

export default TargetingSettings
