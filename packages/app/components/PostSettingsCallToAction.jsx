import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import produce from 'immer'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import CallToActionSelector from '@/app/CallToActionSelector'
import PostSettingsSaveButton from '@/app/PostSettingsSaveButton'

import CheckboxInput from '@/elements/CheckboxInput'
import Error from '@/elements/Error'

import { getPostCallToActions, setPostCallToAction } from '@/app/helpers/postsHelpers'
import { capitalise } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  conversionsPreferences: state.conversionsPreferences,
  optimizationPreferences: state.optimizationPreferences,
})

const PostSettingsCallToAction = ({
  post,
  campaignType,
  updatePost,
  isDisabled,
}) => {
  const {
    id: postId,
    promotionStatus,
  } = post

  const [callToActions, setCallToActions] = React.useState(post.callToActions)
  const [savedCallToAction, setSavedCallToAction] = React.useState('')
  const [currentCallToAction, setCurrentCallToAction] = React.useState('')
  const [currentCallToActionId, setCurrentCallToActionId] = React.useState('')

  const [isDefaultCallToAction, setIsDefaultCallToAction] = React.useState(true)
  const [shouldShowSaveButton, setShouldShowSaveButton] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  // Get global default call to actions for both campaign types from store
  const { postsPreferences, conversionsPreferences, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { callToAction: defaultPostsCallToAction } = postsPreferences
  const { callToAction: defaultConversionsCallToAction } = conversionsPreferences
  const defaultCallToAction = campaignType === 'all' ? defaultPostsCallToAction : defaultConversionsCallToAction || defaultPostsCallToAction
  const defaultCallToActionString = capitalise(defaultCallToAction.toLowerCase().split('_').join(' '))

  const isPostActive = promotionStatus === 'active'

  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  // Get post level call to actions
  useAsyncEffect(async (isMounted) => {
    if (post.callToActions) return

    const { res: callToActions, error } = await getPostCallToActions(artistId, postId)
    if (!isMounted) return

    if (error) {
      return
    }

    setCallToActions(callToActions)
    updatePost('update-call-to-actions', { callToActions })
  }, [])

  const handleChange = () => {
    setIsDefaultCallToAction(!isDefaultCallToAction)

    if (!isDefaultCallToAction) {
      setCurrentCallToAction(defaultCallToAction)
    }
  }

  const updatePostState = (callToAction) => {
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
    setSavedCallToAction(callToAction.value)

    updatePost('update-call-to-actions', { callToActions: updatedCallToActions })
  }

  // Save currently selected call to action and hide save button
  const save = async () => {
    const { res: callToAction, error } = await setPostCallToAction({
      artistId,
      callToAction: currentCallToAction,
      hasSalesObjective,
      assetId: postId,
      campaignType,
      callToActionId: currentCallToActionId,
    })

    if (error) {
      setError(error)
      return
    }

    setShouldShowSaveButton(false)
    updatePostState(callToAction)

    if (currentCallToAction === defaultCallToAction) {
      setIsDefaultCallToAction(true)
    }
  }

  // Watch for call to action changes and show save button if there has been a change
  React.useEffect(() => {
    const hasChanged = currentCallToAction !== savedCallToAction

    setShouldShowSaveButton(hasChanged)
  }, [currentCallToAction, savedCallToAction])

  // On initial mount and on campaign type change set the call to action
  React.useEffect(() => {
    if (!callToActions) return

    const postCallToAction = callToActions?.find((callToAction) => callToAction.campaignType === campaignType) || {}
    // Initial value is post level call to action, or default call to action
    const callToAction = postCallToAction?.value || defaultCallToAction || ''

    setCurrentCallToAction(callToAction)
    setCurrentCallToActionId(postCallToAction?.id || '')
    setSavedCallToAction(callToAction)

    if (postCallToAction?.value && postCallToAction?.value !== defaultCallToAction) {
      setIsDefaultCallToAction(false)
    }
  }, [campaignType, callToActions, defaultCallToAction])

  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <p className={[
          'text-lg font-bold',
          isDisabled ? 'text-grey-2' : null,
        ].join(' ')}
        >
          Call to action
        </p>
        <PostSettingsSaveButton
          onClick={save}
          shouldShow={shouldShowSaveButton}
        />
      </div>
      <CheckboxInput
        buttonLabel={`Use default (${defaultCallToActionString})`}
        value="cta"
        checked={isDefaultCallToAction}
        onChange={handleChange}
        disabled={isDisabled}
        className="sm:pl-2"
      />
      {!isDefaultCallToAction && (
        <CallToActionSelector
          callToAction={currentCallToAction}
          setCallToAction={setCurrentCallToAction}
          callToActionId={currentCallToActionId}
          postId={postId}
          isPostActive={isPostActive}
          campaignType={campaignType}
          disabled={false}
          className="sm:pl-4"
        />
      )}
      <Error error={error} />
    </div>
  )
}

PostSettingsCallToAction.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

PostSettingsCallToAction.defaultProps = {
}

export default PostSettingsCallToAction
