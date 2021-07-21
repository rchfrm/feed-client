import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'

import useControlsStore from '@/app/stores/controlsStore'

import CallToActionSelector from '@/app/CallToActionSelector'

import { setPostCallToAction } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  conversionsPreferences: state.conversionsPreferences,
})

const PostCardSettingsCallToAction = ({
  postId,
  postIndex,
  postCallToActions,
  updatePost,
  campaignType,
}) => {
  // Get initial call to action value and id
  const { id = '', value = '' } = postCallToActions[0] || {}
  // Manage local state
  const [callToActions, setCallToActions] = React.useState(postCallToActions)
  const [selectedCallToAction, setSelectedCallToAction] = React.useState(value)
  const [callToActionId, setCallToActionId] = React.useState(id)
  // Get global default call to actions for both campaign types from store
  const { postsPreferences, conversionsPreferences } = useControlsStore(getControlsStoreState)
  const { callToAction: defaultPostsCallToAction } = postsPreferences
  const { callToAction: defaultConversionsCallToAction } = conversionsPreferences

  const handleSuccess = (callToAction) => {
    // Check if call to action already exists for the selected campaign type
    const index = callToActions.findIndex(({ campaignType }) => campaignType === callToAction.campaignType)
    // Update local state
    const updatedCallToActions = produce(callToActions, draftState => {
      // If the call to action exists, only update it's value
      if (index !== -1) {
        draftState[index].value = callToAction.value
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
    updatePost('update-call-to-action', payload)
  }

  React.useEffect(() => {
    // When the campaign type view changes .. set the selected call to action value and id again
    const { id = '', value = '' } = callToActions.find((callToAction) => callToAction.campaignType === campaignType) || {}
    const defaultCallToAction = campaignType === 'all' ? defaultPostsCallToAction : defaultConversionsCallToAction || defaultPostsCallToAction
    // Use post level call to action value, if it doesnt exist use default call to action value, otherwise set empty string
    setSelectedCallToAction(value || defaultCallToAction || '')
    setCallToActionId(id)
  }, [campaignType, callToActions, defaultPostsCallToAction, defaultConversionsCallToAction])

  return (
    <CallToActionSelector
      onSelect={setPostCallToAction}
      onSuccess={handleSuccess}
      callToAction={selectedCallToAction}
      setCallToAction={setSelectedCallToAction}
      callToActionId={callToActionId}
      postId={postId}
      campaignType={campaignType}
      shouldSaveOnChange
    />
  )
}

PostCardSettingsCallToAction.propTypes = {
  postId: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
  postCallToActions: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatePost: PropTypes.func.isRequired,
  campaignType: PropTypes.string.isRequired,
}

PostCardSettingsCallToAction.defaultProps = {
}

export default PostCardSettingsCallToAction
