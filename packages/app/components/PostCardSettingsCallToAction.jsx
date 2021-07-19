import React from 'react'
import PropTypes from 'prop-types'

import CallToActionSelector from '@/app/CallToActionSelector'

import { setPostCallToAction } from '@/app/helpers/postsHelpers'

import useControlsStore from '@/app/stores/controlsStore'

const getPostsPreferences = state => state.postsPreferences

const PostCardSettingsCallToAction = ({
  postId,
  postIndex,
  updatePost,
  campaignType,
}) => {
  const postsPreferences = useControlsStore(getPostsPreferences)
  const [callToAction, setCallToAction] = React.useState(postsPreferences.callToAction)

  const handleSuccess = ({ callToAction }) => {
    const payload = {
      postIndex,
      callToAction,
    }
    updatePost('update-call-to-action', payload)
  }

  return (
    <CallToActionSelector
      onSelect={setPostCallToAction}
      onSuccess={handleSuccess}
      callToAction={callToAction}
      setCallToAction={setCallToAction}
      postId={postId}
      campaignType={campaignType}
      shouldSaveOnChange
    />
  )
}

PostCardSettingsCallToAction.propTypes = {
  postId: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
  updatePost: PropTypes.func.isRequired,
  campaignType: PropTypes.string.isRequired,
}

PostCardSettingsCallToAction.defaultProps = {
}

export default PostCardSettingsCallToAction
