import React from 'react'

import produce from 'immer'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import TargetingSettingsHelp from '@/app/TargetingSettingsHelp'
import TargetingAgeSlider from '@/app/TargetingAgeSlider'
import TargetingLocations from '@/app/TargetingLocations'
import TargetingLocationsHelper from '@/app/TargetingLocationsHelper'
import TargetingSettingsSaveContainer from '@/app/TargetingSettingsSaveContainer'
import TargetingGenderSelector from '@/app/TargetingGenderSelector'
import TargetingPlatformsSelector from '@/app/TargetingPlatformsSelector'
import TargetingNoDefaultLink from '@/app/TargetingNoDefaultLink'
import ControlsContentSection from '@/app/ControlsContentSection'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import copy from '@/app/copy/targetingPageCopy'

const TargetingSettings = () => {
  // Fetch from targeting context
  const {
    targetingState,
    initialTargetingState,
    setTargetingState,
    settingsReady,
    disableSaving,
    saveTargetingSettings,
    targetingLoading,
    cancelUpdateSettings,
    errorUpdatingSettings,
  } = React.useContext(TargetingContext)

  // Fetch locations options
  const { artist: { missingDefaultLink } } = React.useContext(ArtistContext)

  React.useEffect(() => {
    return () => cancelUpdateSettings()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle missing default link
  if (missingDefaultLink) return <TargetingNoDefaultLink />

  // Show spinner while loading
  if (!settingsReady || targetingLoading) return <div className="h-full flex"><Spinner width={36} /></div>

  return (
    <div>
      <div className="relative pt-5 xxs:pt-0">
        {/* Anchor for resizing desktop budget */}
        <div
          className="absolute top-0 left-0 h-10 w-full invisible bg-red pointer-events-none"
        />
        {/* INTRO */}
        <h2>Targeting</h2>
        <ControlsContentSection action="adjust your targeting">
          <MarkdownText
            markdown={copy.settingsIntro}
            className={[
              'mb-12',
            ].join(' ')}
          />
          {/* ERROR HANDLING */}
          {errorUpdatingSettings && (
            <Error error={errorUpdatingSettings} />
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
          <div>
            <TargetingLocations
              initialCityKeys={initialTargetingState.cityKeys}
              initialCountryCodes={initialTargetingState.countryCodes}
              className="mb-3"
            />
            <TargetingLocationsHelper className="mb-10" />
          </div>
          {/* DESKTOP BUDGET SETTER */}
          <TargetingSettingsSaveContainer
            disableSaving={disableSaving}
            initialTargetingState={initialTargetingState}
            targetingState={targetingState}
            saveTargetingSettings={saveTargetingSettings}
          >
            <TargetingSettingsHelp desktopVersion />
          </TargetingSettingsSaveContainer>
        </ControlsContentSection>
      </div>
    </div>
  )
}

TargetingSettings.propTypes = {

}

export default TargetingSettings
