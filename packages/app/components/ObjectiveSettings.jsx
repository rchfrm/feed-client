import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import MarkdownText from '@/elements/MarkdownText'

import ObjectiveSettingsSelector from '@/app/ObjectiveSettingsSelector'
import ControlsContentSection from '@/app/ControlsContentSection'

import { objectives, platforms } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ObjectiveSettings = () => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  return (
    <div>
      <h2>Objective</h2>
      <ControlsContentSection action="choose your objective">
        <MarkdownText
          markdown={copy.objectiveIntro}
          className={[
            'mb-12',
          ].join(' ')}
        />
        <ObjectiveSettingsSelector
          name="objective"
          label="Primary"
          optionValues={objectives}
          currentObjective={{ objective, platform }}
        />
        {objective === 'growth' && (
          <ObjectiveSettingsSelector
            name="platform"
            label="Platform"
            optionValues={platforms}
            currentObjective={{ objective, platform }}
          />
        )}
      </ControlsContentSection>
    </div>
  )
}

export default ObjectiveSettings
