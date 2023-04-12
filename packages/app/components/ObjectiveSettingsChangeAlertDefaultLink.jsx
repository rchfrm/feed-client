import React from 'react'
import PropTypes from 'prop-types'
import DefaultLinkForm from '@/app/DefaultLinkForm'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertDefaultLink = ({
  link,
  setLink,
  objective,
  setIsDisabled,
}) => {
  const [error, setError] = React.useState(null)

  return (
    <>
      <h2>{copy.alertLinkTitle('spotify')}</h2>
      <MarkdownText markdown={copy.alertLinkDescription('spotify')} className="text-grey-dark italic" />
      <Error error={error} />
      <DefaultLinkForm
        link={link}
        setLink={setLink}
        objective={objective}
        platform="spotify"
        error={error}
        setError={setError}
        setIsDisabled={setIsDisabled}
      />
    </>
  )
}

ObjectiveSettingsChangeAlertDefaultLink.propTypes = {
  link: PropTypes.object.isRequired,
  setLink: PropTypes.func.isRequired,
  setIsDisabled: PropTypes.func.isRequired,
  objective: PropTypes.string.isRequired,
}

export default ObjectiveSettingsChangeAlertDefaultLink
