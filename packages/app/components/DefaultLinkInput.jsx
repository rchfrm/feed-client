import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import Button from '@/elements/Button'
import Input from '@/elements/Input'

import { getIntegrationInfo, testValidIntegration } from '@/helpers/integrationHelpers'
import { splitLinks } from '@/app/helpers/linksHelpers'
import { enforceUrlProtocol } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
})

const DefaultLinkInput = ({
  link,
  setLink,
  error,
  setError,
  objective,
  platform,
  setIsDisabled,
  toggleSelect,
}) => {
  const hasGrowthObjective = objective === 'growth'
  const defaultPlaceholder = 'https://'

  const {
    nestedLinks,
  } = useControlsStore(getControlsStoreState)

  const [placeholder, setPlaceholder] = React.useState(defaultPlaceholder)
  const { looseLinks } = splitLinks(nestedLinks)

  const handleChange = (e) => {
    if (error) {
      setError(null)
    }

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
    if (!hasGrowthObjective) {
      setIsDisabled(!link.href)
      return
    }

    const sanitisedLink = enforceUrlProtocol(link.href, true)
    const hasError = !testValidIntegration(sanitisedLink, platform)

    setIsDisabled(!link.href || hasError)
  }, [hasGrowthObjective, objective, platform, link, setIsDisabled])

  React.useEffect(() => {
    return () => setIsDisabled(false)
  }, [setIsDisabled])

  return (
    <>
      <Input
        name="link-url"
        version="box"
        type="url"
        value={link.href}
        handleChange={handleChange}
        placeholder={placeholder}
        className="w-full mb-2"
      />
      {(!hasGrowthObjective && looseLinks.length > 0) && (
        <Button
          version="text"
          onClick={toggleSelect}
          className="h-auto text-xs mr-auto mb-8"
        >
          Choose from your existing links
        </Button>
      )}
    </>
  )
}

DefaultLinkInput.propTypes = {
  link: PropTypes.object.isRequired,
  setLink: PropTypes.func.isRequired,
  error: PropTypes.object,
  setError: PropTypes.func.isRequired,
  objective: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  setIsDisabled: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired,
}

DefaultLinkInput.defaultProps = {
  error: null,
}

export default DefaultLinkInput
