import React from 'react'
import Link from 'next/link'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import ControlsContentSection from '@/app/ControlsContentSection'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'
import ObjectiveSettingsSelector from '@/app/ObjectiveSettingsSelector'
import ObjectiveSettingsDefaultLink from '@/app/ObjectiveSettingsDefaultLink'

import { objectives, platforms } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/controlsPageCopy'
import * as ROUTES from '@/app/constants/routes'

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
  const platformsString = missingIntegrations.join(', ').replace(/,(?!.*,)/gmi, ' or')

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
            <ControlsSettingsSectionFooter top={64}>
              <p className="text-insta text-xs italic mb-0">
                To grow {platformsString}, first connect your profiles on the
                <Link href={{ pathname: ROUTES.CONTROLS_INTEGRATIONS }}>
                  <a className="-hover--insta ml-1">integrations page</a>
                </Link>
              </p>
            </ControlsSettingsSectionFooter>
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
