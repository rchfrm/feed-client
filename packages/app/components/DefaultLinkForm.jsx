import React from 'react'
import PropTypes from 'prop-types'
import DefaultLinkInput from '@/app/DefaultLinkInput'

const DefaultLinkForm = ({
  link,
  setLink,
  objective,
  platform,
  error,
  setError,
  setIsDisabled,
}) => {
  return (
    <div className="flex w-full">
      <DefaultLinkInput
        link={link}
        setLink={setLink}
        error={error}
        setError={setError}
        objective={objective}
        platform={platform}
        setIsDisabled={setIsDisabled}
      />
    </div>
  )
}

DefaultLinkForm.propTypes = {
  link: PropTypes.object.isRequired,
  setLink: PropTypes.func.isRequired,
  objective: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  error: PropTypes.object,
  setError: PropTypes.func.isRequired,
  setIsDisabled: PropTypes.func.isRequired,
}

DefaultLinkForm.defaultProps = {
  error: null,
}

export default DefaultLinkForm
