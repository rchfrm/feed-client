import React from 'react'
import PropTypes from 'prop-types'

import Input from '@/elements/Input'
import MarkdownText from '@/elements/MarkdownText'

import { getIntegrationInfo } from '@/helpers/integrationHelpers'
import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertDefaultLink = ({
  objective,
  platform,
  data,
  setData,
  shouldStoreData,
  setShouldStoreData,
}) => {
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

  React.useEffect(() => {
    if (shouldStoreData) {
      setData({ ...data, link })
      setShouldStoreData(false)
    }
  }, [shouldStoreData, setShouldStoreData, data, setData, link])

  return (
    <>
      <h3>{copy.alertLinkTitle}</h3>
      <MarkdownText markdown={copy.alertLinkDescription} />
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

ObjectiveSettingsChangeAlertDefaultLink.propTypes = {
  objective: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
}

ObjectiveSettingsChangeAlertDefaultLink.defaultProps = {
}

export default ObjectiveSettingsChangeAlertDefaultLink
