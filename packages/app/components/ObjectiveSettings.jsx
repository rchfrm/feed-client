import React from 'react'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import useSaveIntegrationLink from '@/app/hooks/useSaveIntegrationLink'
import MarkdownText from '@/elements/MarkdownText'
import DisabledSection from '@/app/DisabledSection'
import ObjectiveButton from '@/app/ObjectiveButton'
import ObjectiveContactFooter from '@/app/ObjectiveContactFooter'
import ObjectiveSettingsInstagramNotConnected from '@/app/ObjectiveSettingsInstagramNotConnected'
import ObjectiveSettingsChangeAlert from '@/app/ObjectiveSettingsChangeAlert'
import {
  updateArtist,
  getPreferencesObject,
  getObjectiveString,
  getArtistIntegrationByPlatform,
  platforms,
  optimizations,
} from '@/app/helpers/artistHelpers'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'
import copy from '@/app/copy/controlsPageCopy'
import { capitalise } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
  optimizationPreferences: state.optimizationPreferences,
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
})

const ObjectiveSettings = () => {
  const { updatePreferences, nestedLinks, updateLinks, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const currentOptimization = optimizations.find((opt) => opt.objective === optimizationPreferences.objective && opt.platform === optimizationPreferences.platform)

  const [optimization, setOptimization] = React.useState(currentOptimization)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const { artist, setPostPreferences } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const hasInstagramConnected = Boolean(getArtistIntegrationByPlatform(artist, 'instagram')?.accountId)
  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const hasInstagramOrSpotifyGrowth = currentOptimization.platform === 'instagram' || currentOptimization.platform === 'spotify'
  const saveIntegrationLink = useSaveIntegrationLink()

  const save = async ({ platform, newLink }) => {
    let integrationLink = getLinkByPlatform(nestedLinks, platform)

    if (! integrationLink?.accountId && ! newLink) {
      setShouldShowAlert(true)
      return
    }

    setIsLoading(true)

    if (newLink) {
      const { savedLink } = await saveIntegrationLink({ platform }, newLink.href)
      integrationLink = savedLink
    }

    const { res: updatedArtist, error } = await updateArtist(artist, {
      objective: optimization.objective,
      platform: optimization.platform,
      defaultLink: integrationLink.id,
    })

    if (error) {
      setIsLoading(false)
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
    setIsLoading(false)
  }

  const onCancel = () => {
    setShouldShowAlert(false)
  }

  const handleClick = (newOptimization) => {
    setOptimization(newOptimization)
    save({ platform: newOptimization.platform })
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
          <div className="flex flex-col lg:flex-row mb-10 gap-y-4 lg:gap-x-8 flex-wrap">
            {optimizations.reduce((acc, optimization) => {
              const hasConversationsAccess = Boolean(artist.feature_flags?.conversations_objective_enabled)
              if (optimization.objective === 'conversations' && ! hasConversationsAccess) return acc

              const key = `${optimization.platform}_${optimization.objective}`
              const isActive = currentOptimization.platform === optimization.platform && currentOptimization.objective === optimization.objective
              const button = (
                <ObjectiveButton
                  key={key}
                  optimization={optimization}
                  setOptimization={handleClick}
                  isActive={isActive}
                  isLoading={isLoading}
                  isDisabled={optimization.platform === 'instagram' && ! hasInstagramConnected}
                />
              )
              acc.push(button)
              return acc
            }, [])}
          </div>
          {! hasInstagramConnected && <ObjectiveSettingsInstagramNotConnected />}
          <ObjectiveContactFooter />
        </div>
      </DisabledSection>
      {shouldShowAlert && (
        <ObjectiveSettingsChangeAlert
          objective={objective}
          platform={optimization}
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
