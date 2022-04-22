import React from 'react'

import Select from '@/elements/Select'

import { platforms } from '@/app/helpers/artistHelpers'

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
      <h3>Where would you like to grow?</h3>
      <p>You can always change this later on. You'll also have the option to send people to multiple platforms using different posts.</p>
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
