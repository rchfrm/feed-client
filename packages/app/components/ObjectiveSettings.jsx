import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import MarkdownText from '@/elements/MarkdownText'

import ControlsContentSection from '@/app/ControlsContentSection'
import ObjectiveSettingsObjectiveSelector from '@/app/ObjectiveSettingsObjectiveSelector'
import ObjectiveSettingsPlatformSelector from '@/app/ObjectiveSettingsPlatformSelector'
import ObjectiveSettingsDefaultLink from '@/app/ObjectiveSettingsDefaultLink'
import ObjectiveSettingsChangeAlert from '@/app/ObjectiveSettingsChangeAlert'

import { updateArtist, getPreferencesObject } from '@/app/helpers/artistHelpers'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  postsPreferences: state.postsPreferences,
  updatePreferences: state.updatePreferences,
  optimizationPreferences: state.optimizationPreferences,
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
})

const ObjectiveSettings = () => {
  const { artist, setPostPreferences } = React.useContext(ArtistContext)
  const { defaultLink, postsPreferences, updatePreferences, nestedLinks, updateLinks, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { defaultLinkId } = postsPreferences

  const [objective, setObjective] = React.useState(optimizationPreferences.objective)
  const [platform, setPlatform] = React.useState(optimizationPreferences.platform)
  const [type, setType] = React.useState('')
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [objectiveChangeSteps, setObjectiveChangeSteps] = React.useState([])
  const [shouldRestoreObjective, setShouldRestoreObjective] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const hasGrowthObjective = objective === 'growth'
  const isObjectiveChange = type === 'objective'
  const isPlatformChange = type === 'platform'

  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)

  const save = async ({ objective, platform, savedLink }, objectiveChangeSteps, forceRun = false) => {
    if (shouldRestoreObjective) {
      setShouldRestoreObjective(false)
      return
    }

    if (objectiveChangeSteps.length > 0 && !forceRun) {
      setShouldShowAlert(true)
      return
    }

    const hasGrowthObjective = objective === 'growth'
    let link = savedLink

    setIsLoading(true)

    if (hasGrowthObjective && !link) {
      link = getLinkByPlatform(nestedLinks, platform)
    }

    const { res: updatedArtist, error } = await updateArtist(artist, {
      objective,
      platform,
      ...(objective !== 'growth' && { platform: 'website' }),
      defaultLink: link?.id || defaultLinkId,
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    if (link) {
      // Set the new link as the default link
      updateLinks('chooseNewDefaultLink', { newArtist: updatedArtist, newLink: link })

      // Update artist status
      setPostPreferences('default_link_id', link.id)
    }

    // Update targeting values
    const isFacebookOrInstagram = platform === 'facebook' || platform === 'instagram'

    saveTargetingSettings({
      ...targetingState,
      platforms: isFacebookOrInstagram ? [platform] : [],
    })

    // Update preferences object in controls store
    updatePreferences(getPreferencesObject(updatedArtist))

    setIsLoading(false)
  }

  return (
    <div>
      <h2>Objective</h2>
      <ControlsContentSection action="choose your objective">
        <MarkdownText markdown={copy.objectiveIntro} className="mb-10" />
        <ObjectiveSettingsObjectiveSelector
          objective={objective}
          setObjective={setObjective}
          platform={platform}
          setPlatform={setPlatform}
          setType={setType}
          shouldShowAlert={shouldShowAlert}
          setObjectiveChangeSteps={setObjectiveChangeSteps}
          shouldRestoreObjective={shouldRestoreObjective && isObjectiveChange}
          setShouldRestoreObjective={setShouldRestoreObjective}
          save={save}
          isLoading={isLoading && isObjectiveChange}
          error={error}
        />
        {hasGrowthObjective ? (
          <div className="relative">
            <ObjectiveSettingsPlatformSelector
              objective={objective}
              platform={platform}
              setPlatform={setPlatform}
              setType={setType}
              shouldShowAlert={shouldShowAlert}
              setObjectiveChangeSteps={setObjectiveChangeSteps}
              shouldRestoreObjective={shouldRestoreObjective && isPlatformChange}
              setShouldRestoreObjective={setShouldRestoreObjective}
              save={save}
              isLoading={isLoading && isPlatformChange}
              error={error}
            />
          </div>
        ) : (
          <ObjectiveSettingsDefaultLink
            defaultLink={defaultLink}
            setPostPreferences={setPostPreferences}
            objective={objective}
            label="Default Link"
            className="mb-8"
          />
        )}
        {shouldShowAlert && (
          <ObjectiveSettingsChangeAlert
            objectiveChangeSteps={objectiveChangeSteps}
            shouldShowAlert={shouldShowAlert}
            setShouldShowAlert={setShouldShowAlert}
            onCancel={() => {
              setShouldRestoreObjective(true)
              setShouldShowAlert(false)
            }}
            save={save}
            objective={objective}
            platform={platform}
            setPlatform={setPlatform}
          />
        )}
      </ControlsContentSection>
    </div>
  )
}

export default ObjectiveSettings
