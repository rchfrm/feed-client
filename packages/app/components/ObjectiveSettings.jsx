import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import ControlsContentSection from '@/app/ControlsContentSection'
import ObjectiveSettingsSelector from '@/app/ObjectiveSettingsSelector'
import ObjectiveSettingsDefaultLink from '@/app/ObjectiveSettingsDefaultLink'
import ObjectiveSettingsChangeAlert from '@/app/ObjectiveSettingsChangeAlert'

import { objectives, platforms } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  optimizationPreferences: state.optimizationPreferences,
})

const ObjectiveSettings = () => {
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [objectiveChangeSteps, setObjectiveChangeSteps] = React.useState([])
  const [shouldRestoreObjective, setShouldRestoreObjective] = React.useState(false)

  const { defaultLink, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const hasGrowthObjective = objective === 'growth'

  const {
    setPostPreferences,
  } = React.useContext(ArtistContext)

  return (
    <div>
      <h2>Objective</h2>
      <ControlsContentSection action="choose your objective">
        <MarkdownText markdown={copy.objectiveIntro} className="mb-10" />
        <ObjectiveSettingsSelector
          name="objective"
          optionValues={objectives}
          currentObjective={{ objective, platform }}
          setShouldShowAlert={setShouldShowAlert}
          setObjectiveChangeSteps={setObjectiveChangeSteps}
          shouldRestoreObjective={shouldRestoreObjective}
          setShouldRestoreObjective={setShouldRestoreObjective}
        />
        {hasGrowthObjective ? (
          <div className="relative">
            <ObjectiveSettingsSelector
              name="platform"
              optionValues={platforms}
              currentObjective={{ objective, platform }}
              setShouldShowAlert={setShouldShowAlert}
              setObjectiveChangeSteps={setObjectiveChangeSteps}
              shouldRestoreObjective={shouldRestoreObjective}
              setShouldRestoreObjective={setShouldRestoreObjective}
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
            show={shouldShowAlert}
            onCancel={() => {
              setShouldShowAlert(false)
              setShouldRestoreObjective(true)
            }}
            setShouldRestoreObjective={setShouldRestoreObjective}
          />
        )}
      </ControlsContentSection>
    </div>
  )
}

export default ObjectiveSettings
