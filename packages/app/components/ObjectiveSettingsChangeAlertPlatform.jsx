import React from 'react'

import Select from '@/elements/Select'
import MarkdownText from '@/elements/MarkdownText'

import { platforms } from '@/app/helpers/artistHelpers'
import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertPlatform = () => {
  const [platform, setPlatform] = React.useState('')
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
