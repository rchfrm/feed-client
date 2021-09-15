import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import useAsyncEffect from 'use-async-effect'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import TargetingSettingsHelp from '@/app/TargetingSettingsHelp'
import TargetingAgeSlider from '@/app/TargetingAgeSlider'
import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingLocations from '@/app/TargetingLocations'
import TargetingLocationsHelper from '@/app/TargetingLocationsHelper'
import TargetingSettingsSaveContainer from '@/app/TargetingSettingsSaveContainer'
import TargetingGenderSelector from '@/app/TargetingGenderSelector'
import TargetingPlatformsSelector from '@/app/TargetingPlatformsSelector'
import TargetingNoDefaultLink from '@/app/TargetingNoDefaultLink'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import { fetchPopularLocations } from '@/app/helpers/targetingHelpers'

import copy from '@/app/copy/targetingPageCopy'

const TargetingSettings = () => {
  // Fetch from targeting context
  const {
    targetingState,
    initialTargetingState,
    setTargetingState,
    createLocationOptions,
    settingsReady,
    setSettingsReady,
    disableSaving,
    saveTargetingSettings,
    targetingLoading,
    cancelUpdateSettings,
  } = React.useContext(TargetingContext)

  // Fetch locations options
  const [errorFetchingLocations, setErrorFetchingLocations] = React.useState(null)
  const { artistId, artist: { missingDefaultLink } } = React.useContext(ArtistContext)
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
        <MarkdownText
          markdown={copy.settingsIntro}
          className={[
            'mb-12',
          ].join(' ')}
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
          </div>
        )}
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
    </div>
  )
}

TargetingSettings.propTypes = {

}

export default TargetingSettings
