import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import useAsyncEffect from 'use-async-effect'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'
import Button from '@/elements/Button'

import TargetingSettingsHelp from '@/app/TargetingSettingsHelp'
import TargetingAgeSlider from '@/app/TargetingAgeSlider'
import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingLocations from '@/app/TargetingLocations'
import TargetingLocationsHelper from '@/app/TargetingLocationsHelper'
import TargetingLocationsSettings from '@/app/TargetingLocationsSettings'
import TargetingBudgetBox from '@/app/TargetingBudgetBox'
import TargetingSettingsSaveContainer from '@/app/TargetingSettingsSaveContainer'
import TargetingGenderSelector from '@/app/TargetingGenderSelector'
import TargetingPlatformsSelector from '@/app/TargetingPlatformsSelector'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import { fetchPopularLocations } from '@/app/helpers/targetingHelpers'

import copy from '@/app/copy/targetingPageCopy'

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
    saveTargetingSettings,
    cancelUpdateSettings,
    isFirstTimeUser,
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

  // Show spinner while loading
  if (!settingsReady) return <div><Spinner /></div>

  return (
    <div ref={containerRef}>
      <div className="relative md:w-1/2 pt-5 xxs:pt-0">
        {/* Anchor for resizing desktop budget */}
        <div
          ref={columnRef}
          className="absolute top-0 left-0 h-10 w-full invisible bg-red pointer-events-none"
        />
        {/* INTRO */}
        <MarkdownText
          markdown={copy.settingsIntro}
          className={[
            '-mt-6 mb-12',
            'xxs:mt-0',
            'minContent:-mt-6 minContent:mb-16',
            'md:mb-10',
          ].join(' ')}
        />
        {/* HELP (mobile) */}
        {!isDesktopLayout && (
          <TargetingSettingsHelp />
        )}
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
          options={targetingState.genders}
          initialStateRaw={initialTargetingState.genders}
          onChange={(state) => {
            setTargetingState((targetingState) => {
              return produce(targetingState, draftState => {
                draftState.genders = state
              })
            })
          }}
        />
        {/* PLATFORMS */}
        <TargetingPlatformsSelector
          className="mb-16"
          options={targetingState.platforms}
          initialStateRaw={initialTargetingState.platforms}
          onChange={(state) => {
            setTargetingState((targetingState) => {
              return produce(targetingState, draftState => {
                draftState.platforms = state
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
            <TargetingLocations
              initialCityKeys={initialTargetingState.cityKeys}
              initialCountryCodes={initialTargetingState.countryCodes}
              className="mb-3"
            />
            <TargetingLocationsHelper className="mb-10" />
            <TargetingLocationsSettings />
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
            initialTargetingState={initialTargetingState}
            targetingState={targetingState}
            saveTargetingSettings={saveTargetingSettings}
            cancelUpdateSettings={cancelUpdateSettings}
            budgetRef={budgetRef}
            isFirstTimeUser={isFirstTimeUser}
          >
            <TargetingSettingsHelp desktopVersion />
          </TargetingSettingsSaveContainer>
        </>
      )}
    </div>
  )
}

TargetingSettings.propTypes = {

}

export default TargetingSettings
