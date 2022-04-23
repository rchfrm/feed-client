import React from 'react'

import Select from '@/elements/Select'
import MarkdownText from '@/elements/MarkdownText'

import { platforms } from '@/app/helpers/artistHelpers'
import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertPlatform = ({
  shouldSave,
  setShouldSave,
  currentObjective,
  setCurrentObjective,
}) => {
  const [platform, setPlatform] = React.useState(currentObjective.platform || platforms[0].value)
  const [selectOptions, setSelectOptions] = React.useState([])

  React.useEffect(() => {
    const options = platforms.map(({ name, value }) => ({
      name,
      value,
    }))

    setSelectOptions(options)
  }, [])

  const handleChange = (e) => {
    const { target: { value } } = e

    if (value === platform) return

    setPlatform(value)
  }

  React.useEffect(() => {
    if (shouldSave) {
      setCurrentObjective({ ...currentObjective, platform })

      setShouldSave(false)
    }
  }, [shouldSave, setShouldSave, platform, currentObjective, setCurrentObjective])

  return (
    <>
      <h3>{copy.alertPlatformTitle}</h3>
      <MarkdownText markdown={copy.alertPlatformDescription} />
      <Select
        handleChange={handleChange}
        name="platform"
        selectedValue={platform}
        options={selectOptions}
      />
    </>
  )
}

export default ObjectiveSettingsChangeAlertPlatform
