import React from 'react'
import Link from 'next/link'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import ControlsContentSection from '@/app/ControlsContentSection'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'
import ObjectiveSettingsSelector from '@/app/ObjectiveSettingsSelector'
import ObjectiveSettingsDefaultLink from '@/app/ObjectiveSettingsDefaultLink'

import { objectives } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/controlsPageCopy'
import * as ROUTES from '@/app/constants/routes'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  optimizationPreferences: state.optimizationPreferences,
})

const ObjectiveSettings = () => {
  const [platformsWithIntegrationLink, setPlatformsWithIntegrationLink] = React.useState([])
  const [platformsWithoutIntegrationLink, setPlatformsWithoutIntegrationLink] = React.useState([])
  const platformsString = platformsWithoutIntegrationLink.join(', ').replace(/,(?!.*,)/gmi, ' or')

  const { defaultLink, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const hasGrowthObjective = objective === 'growth'

  const {
    artist: {
      integrations,
    },
    setPostPreferences,
  } = React.useContext(ArtistContext)

  React.useEffect(() => {
    if (Object.keys(integrations).length === 0) return

    const platformsWithLink = []
    const platformsWithoutLink = []

    integrations.forEach(({ accountId, platform, title }) => {
      if (platform === 'twitter') return

      if (accountId) {
        platformsWithLink.push({ name: title, value: platform })
      } else {
        platformsWithoutLink.push(title)
      }
    })

    setPlatformsWithIntegrationLink(platformsWithLink)
    setPlatformsWithoutIntegrationLink(platformsWithoutLink)
  }, [integrations])

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
