import React from 'react'
import PropTypes from 'prop-types'
import Input from '@/elements/Input'
import { getIntegrationInfo, testValidIntegration } from '@/helpers/integrationHelpers'
import { enforceUrlProtocol } from '@/helpers/utils'

const DefaultLinkInput = ({
  link,
  setLink,
  error,
  setError,
  objective,
  platform,
  setIsDisabled,
}) => {
  const defaultPlaceholder = 'https://'
  const [placeholder, setPlaceholder] = React.useState(defaultPlaceholder)

  const handleChange = (e) => {
    if (error) {
      setError(null)
    }

    setLink({ ...link, name: 'default link', href: e.target.value })
  }

  React.useEffect(() => {
    const { placeholderUrl } = getIntegrationInfo({ platform })

    setPlaceholder(placeholderUrl)
  }, [platform])

  React.useEffect(() => {
    const sanitisedLink = enforceUrlProtocol(link.href, true)
    const hasError = ! testValidIntegration(sanitisedLink, platform)

    setIsDisabled(! link.href || hasError)
  }, [objective, platform, link, setIsDisabled])

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
}

DefaultLinkInput.defaultProps = {
  error: null,
}

export default DefaultLinkInput
