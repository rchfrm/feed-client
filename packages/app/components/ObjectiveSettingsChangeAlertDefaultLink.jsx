import React from 'react'
import PropTypes from 'prop-types'
import DefaultLinkForm from '@/app/DefaultLinkForm'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertDefaultLink = ({
  objective,
  platform,
  link,
  setLink,
  setIsDisabled,
}) => {
  const [error, setError] = React.useState(null)

  return (
    <>
      <h2>{copy.alertLinkTitle(platform)}</h2>
      <MarkdownText markdown={copy.alertLinkDescription(platform)} className="text-grey-dark italic" />
      <Error error={error} />
      <DefaultLinkForm
        link={link}
        setLink={setLink}
        objective={objective}
        platform={platform}
        error={error}
        setError={setError}
        setIsDisabled={setIsDisabled}
      />
    </>
  )
}

ObjectiveSettingsChangeAlertDefaultLink.propTypes = {
  objective: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  link: PropTypes.object,
  setLink: PropTypes.func.isRequired,
  setIsDisabled: PropTypes.func.isRequired,
}

ObjectiveSettingsChangeAlertDefaultLink.defaultProps = {
  link: null,
}

export default ObjectiveSettingsChangeAlertDefaultLink
