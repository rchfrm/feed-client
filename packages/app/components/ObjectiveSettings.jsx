import React from 'react'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import useSaveIntegrationLink from '@/app/hooks/useSaveIntegrationLink'
import MarkdownText from '@/elements/MarkdownText'
import DisabledSection from '@/app/DisabledSection'
import ObjectiveSettingsChangeAlert from '@/app/ObjectiveSettingsChangeAlert'
import { updateArtist, getPreferencesObject, getObjectiveString } from '@/app/helpers/artistHelpers'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'
import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
  optimizationPreferences: state.optimizationPreferences,
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
})

const ObjectiveSettings = () => {
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)

  const { artist, setPostPreferences } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const { updatePreferences, nestedLinks, updateLinks, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const saveIntegrationLink = useSaveIntegrationLink()
  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const hasInstagramOrSpotifyGrowth = objective === 'growth' && (platform === 'instagram' || platform === 'spotify')

  const save = async ({ platform, link }, forceRun = false) => {
    if (! forceRun) {
      setShouldShowAlert(true)
      return
    }

    let newLink
    if (! link) {
      newLink = getLinkByPlatform(nestedLinks, platform)
    } else {
      const { savedLink } = saveIntegrationLink({ platform: 'spotify' }, link.href)
      newLink = savedLink
    }

    const { res: updatedArtist, error } = await updateArtist(artist, {
      objective,
      platform,
      defaultLink: newLink.id,
    })

    if (error) {
      return
    }

    if (newLink) {
      // Set the new link as the default link
      updateLinks('chooseNewDefaultLink', { newArtist: updatedArtist, newLink })

      // Update artist status
      setPostPreferences('default_link_id', newLink.id)
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

  return (
    <div>
      <h2>Objective</h2>
      <DisabledSection
        section="objective"
        isDisabled={! hasSetUpProfile}
      >
        <MarkdownText markdown={copy.objectiveIntro} className="inline-block" />
        <div className="relative">
          {! hasInstagramOrSpotifyGrowth && <p><span className="font-bold">Current objective: </span>{getObjectiveString(objective, platform)}</p>}
          <div>
            <button
              onClick={() => save({ platform: 'instagram' }, true)}
              className={[platform === 'instagram' ? 'font-bold' : null]}
            >
              Instagram
            </button>
            <button
              onClick={() => save({ platform: 'spotify' }, false)}
              className={[platform === 'spotify' ? 'font-bold' : null]}
            >
              Spotify
            </button>
          </div>
        </div>
      </DisabledSection>
      {shouldShowAlert && (
        <ObjectiveSettingsChangeAlert
          objective={objective}
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
