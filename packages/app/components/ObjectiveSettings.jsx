import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import MarkdownText from '@/elements/MarkdownText'

import ObjectiveSettingsSelector from '@/app/ObjectiveSettingsSelector'
import { objectives, platforms } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ObjectiveSettings = () => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)

  const [objective, setObjective] = React.useState(optimizationPreferences?.objective)
  const [platform, setPlatform] = React.useState(optimizationPreferences?.platform)

  return (
    <div>
      <h2>Objective</h2>
      <MarkdownText
        markdown={copy.objectiveIntro}
        className={[
          'mb-12',
        ].join(' ')}
      />
      <ObjectiveSettingsSelector
        name="objective"
        label="Objective"
        setValue={setObjective}
        values={objectives}
        objective={objective}
        platform={platform}
      />
      {objective === 'growth' && (
        <ObjectiveSettingsSelector
          name="platform"
          label="Platform"
          setValue={setPlatform}
          objective={objective}
          platform={platform}
          values={platforms}
        />
      )}
    </div>
  )
}

export default ObjectiveSettings
