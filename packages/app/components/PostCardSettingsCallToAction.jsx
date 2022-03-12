import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import produce from 'immer'

import useControlsStore from '@/app/stores/controlsStore'

import CallToActionSelector from '@/app/CallToActionSelector'
import Error from '@/elements/Error'

import { getPostCallToActions, setPostCallToAction } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
})

const PostCardSettingsCallToAction = ({
  postId,
  postIndex,
  postCallToActions,
  artistId,
  updatePost,
  postPromotionStatus,
  isDisabled,
}) => {
  // Get call to action from store
  const { postsPreferences } = useControlsStore(getControlsStoreState)
  const { callToAction } = postsPreferences

  // Manage local state
  const [callToActions, setCallToActions] = React.useState(postCallToActions)
  const [selectedCallToAction, setSelectedCallToAction] = React.useState('')
  const [callToActionId, setCallToActionId] = React.useState('')
  const [error, setError] = React.useState(null)

  const isPostActive = postPromotionStatus === 'active'

  useAsyncEffect(async (isMounted) => {
    if (postCallToActions || !isMounted) return

    const { res, error } = await getPostCallToActions(artistId, postId)

    if (error) {
      setError(error)
      return
    }
    setCallToActions(res)
    // Update global posts list state
    const payload = {
      postIndex,
      callToActions: res,
    }
    updatePost('update-call-to-actions', payload)
  }, [])

  const handleSuccess = (callToAction) => {
    // Check if call to action already exists for the selected campaign type
    // Update local state
    const updatedCallToActions = produce(callToActions, draftState => {
      // If the call to action exists, only update it's value
      if (callToActions.length) {
        draftState[0].value = callToAction.value
        return
      }
      // Otherwise push the new call to action object to the array
      draftState.push(callToAction)
    })
    setCallToActions(updatedCallToActions)
    setSelectedCallToAction(callToAction.value)

    // Update global posts list state
    const payload = {
      postIndex,
      callToActions: updatedCallToActions,
    }
    updatePost('update-call-to-actions', payload)
  }

  React.useEffect(() => {
    const { id = '', value = '' } = callToActions?.[0] || {}
    console.log(id)
    // Use post level call to action value, if it doesnt exist use default call to action value, otherwise set empty string
    setSelectedCallToAction(value || callToAction || '')
    setCallToActionId(id)
  }, [callToActions, callToAction])

  return (
    <>
      <CallToActionSelector
        onSelect={setPostCallToAction}
        onSuccess={handleSuccess}
        callToAction={selectedCallToAction}
        setCallToAction={setSelectedCallToAction}
        callToActionId={callToActionId}
        postId={postId}
        isPostActive={isPostActive}
        shouldSaveOnChange
        disabled={isDisabled}
      />
      <Error error={error} />
    </>
  )
}

PostCardSettingsCallToAction.propTypes = {
  postId: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
  postCallToActions: PropTypes.arrayOf(PropTypes.object),
  updatePost: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

PostCardSettingsCallToAction.defaultProps = {
  postCallToActions: null,
}

export default PostCardSettingsCallToAction
