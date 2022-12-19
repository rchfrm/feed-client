import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'
import PostSettingsSaveButton from '@/app/PostSettingsSaveButton'
import PostCallToActionCheckboxSelect from '@/app/PostCallToActionCheckboxSelect'
import PostSettingsEditAlert from '@/app/PostSettingsEditAlert'
import Error from '@/elements/Error'
import { setPostCallToAction } from '@/app/helpers/postsHelpers'

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
  const { id: postId, promotionStatus } = post
  const isPostActive = promotionStatus === 'active'

  const [callToActions, setCallToActions] = React.useState(post.callToActions || [])
  const [savedCallToAction, setSavedCallToAction] = React.useState('')
  const [currentCallToAction, setCurrentCallToAction] = React.useState('')
  const [currentCallToActionId, setCurrentCallToActionId] = React.useState('')
  const [isDefaultCallToAction, setIsDefaultCallToAction] = React.useState(true)
  const [shouldShowSaveButton, setShouldShowSaveButton] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [onAlertConfirm, setOnAlertConfirm] = React.useState(() => () => {})

  const { artistId } = React.useContext(ArtistContext)

  // Get global default call to actions for both campaign types from store
  const { postsPreferences, conversionsPreferences, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { callToAction: defaultPostsCallToAction } = postsPreferences
  const { callToAction: defaultConversionsCallToAction } = conversionsPreferences
  const defaultCallToAction = campaignType === 'all' ? defaultPostsCallToAction : defaultConversionsCallToAction || defaultPostsCallToAction

  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  const updatePostState = (callToAction) => {
    // Check if call to action already exists for the selected campaign type
    const index = callToActions.findIndex(({ campaignType }) => campaignType === callToAction.campaignType)
    // Update local state
    const updatedCallToActions = produce(callToActions, (draftState) => {
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

    updatePost({
      type: 'update-call-to-actions',
      payload: {
        postId,
        callToActions: updatedCallToActions,
      },
    })
  }

  const save = async (forceRun = false) => {
    if (isPostActive && ! forceRun) {
      setOnAlertConfirm(() => () => save(true))
      setShouldShowAlert(true)

      return
    }

    setIsLoading(true)

    const { res: callToAction, error } = await setPostCallToAction({
      artistId,
      callToAction: isDefaultCallToAction ? defaultCallToAction : currentCallToAction,
      hasSalesObjective,
      assetId: postId,
      campaignType,
      callToActionId: currentCallToActionId,
    })

    if (error) {
      setError(error)
      setIsLoading(false)

      return
    }

    setShouldShowSaveButton(false)
    updatePostState(callToAction)

    if (currentCallToAction === defaultCallToAction) {
      setIsDefaultCallToAction(true)
    }

    setIsLoading(false)
  }

  React.useEffect(() => {
    if (isDefaultCallToAction) {
      setShouldShowSaveButton(savedCallToAction !== defaultCallToAction)
    }

    if (! isDefaultCallToAction) {
      setShouldShowSaveButton(savedCallToAction !== currentCallToAction)
    }
  }, [isDefaultCallToAction, currentCallToAction, savedCallToAction, defaultCallToAction])

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
          onClick={() => save()}
          shouldShow={shouldShowSaveButton}
          isLoading={isLoading}
        />
      </div>
      <PostCallToActionCheckboxSelect
        post={post}
        campaignType={campaignType}
        currentCallToAction={currentCallToAction}
        setCurrentCallToAction={setCurrentCallToAction}
        currentCallToActionId={currentCallToActionId}
        setCurrentCallToActionId={setCurrentCallToActionId}
        isDefaultCallToAction={isDefaultCallToAction}
        setIsDefaultCallToAction={setIsDefaultCallToAction}
        setSavedCallToAction={setSavedCallToAction}
        callToActions={callToActions}
        setCallToActions={setCallToActions}
        updatePost={updatePost}
        isDisabled={isDisabled}
        className="sm:pl-4"
      />
      <Error error={error} />
      <PostSettingsEditAlert
        type="call to action"
        shouldShowAlert={shouldShowAlert}
        onConfirm={() => {
          onAlertConfirm()
          setShouldShowAlert(false)
        }}
        onCancel={() => setShouldShowAlert(false)}
      />
    </div>
  )
}

PostSettingsCallToAction.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

export default PostSettingsCallToAction
