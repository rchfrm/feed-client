import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import ControlsContentSection from '@/app/ControlsContentSection'
import ObjectiveSettingsSelector from '@/app/ObjectiveSettingsSelector'
import ObjectiveSettingsDefaultLink from '@/app/ObjectiveSettingsDefaultLink'
import ObjectiveSettingsChangeAlert from '@/app/ObjectiveSettingsChangeAlert'

import { objectives, platforms, updateArtist, getPreferencesObject } from '@/app/helpers/artistHelpers'
import { getLinkByPlatform, splitLinks } from '@/app/helpers/linksHelpers'

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
  const { objective, platform } = optimizationPreferences
  const hasGrowthObjective = objective === 'growth'

  const [currentObjective, setCurrentObjective] = React.useState({ objective, platform })
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [objectiveChangeSteps, setObjectiveChangeSteps] = React.useState([])
  const [shouldRestoreObjective, setShouldRestoreObjective] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const save = async ({ objective, platform }, objectiveChangeSteps, forceRun = false) => {
    if (objectiveChangeSteps.length > 0 && !forceRun) {
      setShouldShowAlert(true)

      return
    }

    const hasGrowthObjective = objective === 'growth'
    let link = null

    setIsLoading(true)

    // Get integration link based on the selected platform if objective is growth, otherwise grab the first loose link
    if (hasGrowthObjective) {
      link = getLinkByPlatform(nestedLinks, platform)
    } else {
      const { looseLinks } = splitLinks(nestedLinks)
      const firstLooseLink = looseLinks[0]

      link = firstLooseLink
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

    // Update preferences object in controls store
    updatePreferences(getPreferencesObject(updatedArtist))

    setIsLoading(false)
  }

  return (
    <div>
      <h2>Objective</h2>
      <ControlsContentSection action="choose your objective">
        <MarkdownText markdown={copy.objectiveIntro} className="mb-10" />
        <ObjectiveSettingsSelector
          name="objective"
          optionValues={objectives}
          currentObjective={currentObjective}
          setCurrentObjective={setCurrentObjective}
          shouldShowAlert={shouldShowAlert}
          setShouldShowAlert={setShouldShowAlert}
          setObjectiveChangeSteps={setObjectiveChangeSteps}
          shouldRestoreObjective={shouldRestoreObjective}
          setShouldRestoreObjective={setShouldRestoreObjective}
          save={save}
          isLoading={isLoading}
          error={error}
        />
        {hasGrowthObjective ? (
          <div className="relative">
            <ObjectiveSettingsSelector
              name="platform"
              optionValues={platforms}
              currentObjective={currentObjective}
              setCurrentObjective={setCurrentObjective}
              shouldShowAlert={shouldShowAlert}
              setShouldShowAlert={setShouldShowAlert}
              setObjectiveChangeSteps={setObjectiveChangeSteps}
              shouldRestoreObjective={shouldRestoreObjective}
              setShouldRestoreObjective={setShouldRestoreObjective}
              save={save}
              isLoading={isLoading}
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
            onCancel={() => {
              setShouldShowAlert(false)
              // setShouldRestoreObjective(true)
            }}
            save={save}
            setCurrentObjective={setCurrentObjective}
            currentObjective={currentObjective}
          />
        )}
      </ControlsContentSection>
    </div>
  )
}

export default ObjectiveSettings
