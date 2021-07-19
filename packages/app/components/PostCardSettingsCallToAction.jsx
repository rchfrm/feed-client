import React from 'react'
import PropTypes from 'prop-types'

import CallToActionSelector from '@/app/CallToActionSelector'

const PostCardSettingsCallToAction = ({ post }) => {
  const [callToAction, setCallToAction] = React.useState('')
  console.log(post)

  const handleSuccess = () => {
    console.log('handle success')
  }

  const handleSelect = () => {
    console.log('set')
  }

  return (
    <CallToActionSelector
      onSelect={handleSelect}
      onSuccess={handleSuccess}
      callToAction={callToAction}
      setCallToAction={setCallToAction}
      shouldSaveOnChange
    />
  )
}

PostCardSettingsCallToAction.propTypes = {
  post: PropTypes.object.isRequired,
}

PostCardSettingsCallToAction.defaultProps = {
}

export default PostCardSettingsCallToAction
