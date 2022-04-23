import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'
import MarkdownText from '@/elements/MarkdownText'

import { platforms } from '@/app/helpers/artistHelpers'
import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertPlatform = ({
  shouldSave,
  setShouldSave,
  platform,
  setPlatform,
}) => {
  const [currentPlatform, setCurrentPlatform] = React.useState(platform || platforms[0].value)
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

    setCurrentPlatform(value)
  }

  React.useEffect(() => {
    if (shouldSave) {
      setPlatform(currentPlatform)

      setShouldSave(false)
    }
  }, [shouldSave, setShouldSave, currentPlatform, setCurrentPlatform, setPlatform])

  return (
    <>
      <h3>{copy.alertPlatformTitle}</h3>
      <MarkdownText markdown={copy.alertPlatformDescription} />
      <Select
        handleChange={handleChange}
        name="platform"
        selectedValue={currentPlatform}
        options={selectOptions}
      />
    </>
  )
}

ObjectiveSettingsChangeAlertPlatform.propTypes = {
  shouldSave: PropTypes.bool.isRequired,
  setShouldSave: PropTypes.func.isRequired,
  platform: PropTypes.func.isRequired,
  setPlatform: PropTypes.func.isRequired,
}

ObjectiveSettingsChangeAlertPlatform.defaultProps = {
}

export default ObjectiveSettingsChangeAlertPlatform
