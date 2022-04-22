import React from 'react'

import Input from '@/elements/Input'

import { getIntegrationInfo } from '@/helpers/integrationHelpers'

const ObjectiveSettingsChangeAlertDefaultLink = ({ objective, platform }) => {
  const hasGrowthObjective = objective === 'growth'
  const defaultPlaceholder = 'https://'

  const [link, setLink] = React.useState({})
  const [placeholder, setPlaceholder] = React.useState(defaultPlaceholder)

  const handleChange = (e) => {
    setLink({ ...link, name: 'default link', href: e.target.value })
  }

  React.useEffect(() => {
    if (hasGrowthObjective) {
      const { placeholderUrl } = getIntegrationInfo({ platform })

      setPlaceholder(placeholderUrl)
      return
    }
    setPlaceholder(defaultPlaceholder)
  }, [hasGrowthObjective, objective, platform])

  return (
    <>
      <h3>Enter the link to your store</h3>
      <p>Set the homepage for now, you can choose to send people to specific product pages later on.</p>
      <Input
        name="link-url"
        version="box"
        type="url"
        value={link.href}
        handleChange={handleChange}
        placeholder={placeholder}
      />
    </>
  )
}

export default ObjectiveSettingsChangeAlertDefaultLink
