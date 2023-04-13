import React from 'react'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import useSaveIntegrationLink from '@/app/hooks/useSaveIntegrationLink'
import MarkdownText from '@/elements/MarkdownText'
import DisabledSection from '@/app/DisabledSection'
import ObjectiveButton from '@/app/ObjectiveButton'
import ObjectiveContactFooter from '@/app/ObjectiveContactFooter'
import ObjectiveSettingsChangeAlert from '@/app/ObjectiveSettingsChangeAlert'
import { updateArtist, getPreferencesObject, getObjectiveString, platforms } from '@/app/helpers/artistHelpers'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'
import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
  optimizationPreferences: state.optimizationPreferences,
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
})

const ObjectiveSettings = () => {
  const { updatePreferences, nestedLinks, updateLinks, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform: currentPlatform } = optimizationPreferences

  const [platform, setPlatform] = React.useState(currentPlatform)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)

  const { artist, setPostPreferences } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const hasInstagramOrSpotifyGrowth = objective === 'growth' && (currentPlatform === 'instagram' || currentPlatform === 'spotify')
  const saveIntegrationLink = useSaveIntegrationLink()

  const save = async ({ platform, newLink }) => {
    let integrationLink = getLinkByPlatform(nestedLinks, platform)

    if (! integrationLink?.accountId && ! newLink) {
      setShouldShowAlert(true)
      return
    }

    if (newLink) {
      const { savedLink } = await saveIntegrationLink({ platform }, newLink.href)
      integrationLink = savedLink
    }

    const { res: updatedArtist, error } = await updateArtist(artist, {
      objective,
      platform,
      defaultLink: integrationLink.id,
    })

    if (error) {
      return
    }

    if (integrationLink) {
      // Set the new link as the default link
      updateLinks('chooseNewDefaultLink', { newArtist: updatedArtist, newLink: integrationLink })

      // Update artist status
      setPostPreferences('default_link_id', integrationLink.id)
    }

    // Update targeting values
    const isInstagram = platform === 'instagram'
    saveTargetingSettings({
      ...targetingState,
      platforms: isInstagram ? [platform] : [],
    })

    // Update preferences object in controls store
    updatePreferences(getPreferencesObject(updatedArtist))
  }

  const onCancel = () => {
    setShouldShowAlert(false)
  }

  const handleClick = (platform) => {
    setPlatform(platform)
    save({ platform })
  }

  return (
    <div>
      <h2>Objective</h2>
      <DisabledSection
        section="objective"
        isDisabled={! hasSetUpProfile}
      >
        <MarkdownText markdown={copy.objectiveIntro} className="mb-10" />
        <div className="relative">
          {! hasInstagramOrSpotifyGrowth && (
            <p><span className="font-bold">Current objective: </span>{getObjectiveString(objective, currentPlatform)}</p>
          )}
          <div className="flex flex-col lg:flex-row mb-10">
            {[platforms[0], platforms[1]].map((platform) => {
              return (
                <ObjectiveButton
                  key={platform.value}
                  platform={platform}
                  setPlatform={handleClick}
                  isActive={currentPlatform === platform.value}
                  className="first:mb-4 lg:first:mb-0 lg:first:mr-8"
                />
              )
            })}
          </div>
          <ObjectiveContactFooter />
        </div>
      </DisabledSection>
      {shouldShowAlert && (
        <ObjectiveSettingsChangeAlert
          objective={objective}
          platform={platform}
          shouldShowAlert={shouldShowAlert}
          setShouldShowAlert={setShouldShowAlert}
          onConfirm={save}
          onCancel={onCancel}
        />
      )}
    </div>
  )
}

export default ObjectiveSettings
