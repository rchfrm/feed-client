import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import useAsyncEffect from 'use-async-effect'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import Button from '@/elements/Button'

import TargetingAgeSlider from '@/app/TargetingAgeSlider'
import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingPickerLocations from '@/app/TargetingPickerLocations'
import TargetingPickerHelper from '@/app/TargetingPickerHelper'
import TargetingBudgetBox from '@/app/TargetingBudgetBox'
import TargetingSettingsSaveContainer from '@/app/TargetingSettingsSaveContainer'
import TargetingGenderSelector from '@/app/TargetingGenderSelector'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/contexts/ArtistContext'

import { fetchPopularLocations } from '@/app/helpers/targetingHelpers'

const TargetingSettings = () => {
  // Fetch from targeting context
  const {
    isDesktopLayout,
    targetingState,
    initialTargetingState,
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
    if (!isMounted()) return
    if (error) {
      setErrorFetchingLocations(error)
    } else {
      setErrorFetchingLocations(null)
      createLocationOptions(targetingState, popularLocations)
    }
    setSettingsReady(true)
  }, [])

  // Desktop Budget anchor
  const containerRef = React.useRef(null)
  const columnRef = React.useRef(null)

  // Budget box ref
  const budgetRef = React.useRef(null)

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
          setTargetingState={setTargetingState}
        />
        {/* GENDER */}
        <TargetingGenderSelector
          className="mb-16"
          genders={targetingState.genders}
          initialGenders={initialTargetingState.genders}
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
          <div>
            <TargetingPickerLocations
              initialCityKeys={initialTargetingState.cityKeys}
              initialCountryCodes={initialTargetingState.countryCodes}
              className="mb-3"
            />
            <TargetingPickerHelper />
          </div>
        )}
        {/* BACK BUTTON (for mobile) */}
        {!isDesktopLayout && (
          <div className="pt-5 pb-20">
            <Button
              className="w-40"
              version="black small"
              onClick={cancelUpdateSettings}
            >
              Back
            </Button>
          </div>
        )}
      </div>
      {/* DESKTOP BUDGET SETTER */}
      {isDesktopLayout && (
        <>
          <TargetingBudgetBox
            ref={budgetRef}
            isFixed
            containerRef={containerRef}
            columnRef={columnRef}
          />
          <TargetingSettingsSaveContainer
            disableSaving={disableSaving}
            targetingState={targetingState}
            saveCampaignSettings={saveCampaignSettings}
            cancelUpdateSettings={cancelUpdateSettings}
            budgetRef={budgetRef}
          />
        </>
      )}
    </div>
  )
}

TargetingSettings.propTypes = {

}

export default TargetingSettings
