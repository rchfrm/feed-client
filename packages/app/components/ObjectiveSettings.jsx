import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import ControlsContentSection from '@/app/ControlsContentSection'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'
import ObjectiveSettingsSelector from '@/app/ObjectiveSettingsSelector'
import ObjectiveSettingsDefaultLink from '@/app/ObjectiveSettingsDefaultLink'

import { objectives, platforms } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  optimizationPreferences: state.optimizationPreferences,
})

const ObjectiveSettings = () => {
  const { defaultLink, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const hasGrowthObjective = objective === 'growth'

  const {
    artist: {
      integrations,
    },
    setPostPreferences,
  } = React.useContext(ArtistContext)

  // Get platforms which have an integration link
  const platformsWithIntegrationLink = integrations.reduce((result, { accountId, platform, title }) => {
    return accountId ? [...result, { name: title, value: platform }] : result
  }, [])

  // Get platforms without an integration link
  const platformsWithoutIntegrationLink = platforms.filter((platform) => platformsWithIntegrationLink.every((platformWithIntegrationLink) => platform.value !== platformWithIntegrationLink.value))
  const missingIntegrations = platformsWithoutIntegrationLink.map(({ name }) => name)

  return (
    <div>
      <h2>Objective</h2>
      <ControlsContentSection action="choose your objective">
        <MarkdownText markdown={copy.objectiveIntro} className="mb-10" />
        <ObjectiveSettingsSelector
          name="objective"
          optionValues={objectives}
          currentObjective={{ objective, platform }}
        />
        {hasGrowthObjective ? (
          <div className="relative">
            <ObjectiveSettingsSelector
              name="platform"
              optionValues={platformsWithIntegrationLink}
              currentObjective={{ objective, platform }}
            />
            <ControlsSettingsSectionFooter top={64} copy={copy.platformFooter(missingIntegrations)} className="text-insta" />
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
      </ControlsContentSection>
    </div>
  )
}

export default ObjectiveSettings
