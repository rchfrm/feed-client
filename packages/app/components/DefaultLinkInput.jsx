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
  const shouldShowButton = !hasGrowthObjective && looseLinks.length > 0

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
    <div className={[
      'w-full relative',
    ].join(' ')}
    >
      <Input
        name="link-url"
        version="box"
        type="url"
        value={link.href}
        handleChange={handleChange}
        placeholder={placeholder}
        className="mb-8"
      />
      {shouldShowButton && (
        <Button
          version="text"
          onClick={toggleSelect}
          className="h-auto absolute bottom-2 text-xs"
          trackComponentName="DefaultLinkInput"
        >
          Choose from your existing links
        </Button>
      )}
    </div>
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
