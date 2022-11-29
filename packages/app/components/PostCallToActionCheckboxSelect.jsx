import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'
import CallToActionSelector from '@/app/CallToActionSelector'
import CheckboxInput from '@/elements/CheckboxInput'
import { getPostCallToActions } from '@/app/helpers/postsHelpers'
import { capitalise } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  conversionsPreferences: state.conversionsPreferences,
})

const PostCallToActionCheckboxSelect = ({
  post,
  campaignType,
  currentCallToAction,
  setCurrentCallToAction,
  currentCallToActionId,
  setCurrentCallToActionId,
  isDefaultCallToAction,
  setIsDefaultCallToAction,
  setSavedCallToAction,
  callToActions,
  setCallToActions,
  updatePost,
  isDisabled,
  className,
}) => {
  const {
    id: postId,
    promotionStatus,
  } = post || {}

  const { artistId } = React.useContext(ArtistContext)

  const { postsPreferences, conversionsPreferences } = useControlsStore(getControlsStoreState)
  const { callToAction: defaultPostsCallToAction } = postsPreferences
  const { callToAction: defaultConversionsCallToAction } = conversionsPreferences
  const defaultCallToAction = campaignType === 'all' ? defaultPostsCallToAction : defaultConversionsCallToAction || defaultPostsCallToAction
  const defaultCallToActionString = capitalise(defaultCallToAction.toLowerCase().split('_').join(' '))

  const isPostActive = promotionStatus === 'active'

  useAsyncEffect(async (isMounted) => {
    if (!post || post?.callToActions) return

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
  }

  React.useEffect(() => {
    if (!callToActions) return

    const postCallToAction = callToActions?.find((callToAction) => callToAction.campaignType === campaignType) || {}
    const callToAction = postCallToAction?.value || defaultCallToAction || ''

    setCurrentCallToAction(callToAction)
    setCurrentCallToActionId(postCallToAction?.id || '')
    setSavedCallToAction(callToAction)

    if (postCallToAction?.value && postCallToAction?.value !== defaultCallToAction) {
      setIsDefaultCallToAction(false)
    }
  }, [campaignType, callToActions, defaultCallToAction, setCurrentCallToAction, setCurrentCallToActionId, setIsDefaultCallToAction, setSavedCallToAction])

  return (
    <div className={className}>
      <CheckboxInput
        buttonLabel={`Use default (${defaultCallToActionString})`}
        value="cta"
        checked={isDefaultCallToAction}
        onChange={handleChange}
        disabled={isDisabled}
      />
      {!isDefaultCallToAction && (
        <CallToActionSelector
          callToAction={currentCallToAction}
          setCallToAction={setCurrentCallToAction}
          callToActionId={currentCallToActionId}
          postId={postId}
          isPostActive={isPostActive}
          campaignType={campaignType}
          disabled={isDisabled}
        />
      )}
    </div>
  )
}

PostCallToActionCheckboxSelect.propTypes = {
  post: PropTypes.object,
  campaignType: PropTypes.string,
  currentCallToAction: PropTypes.string.isRequired,
  setCurrentCallToAction: PropTypes.func.isRequired,
  currentCallToActionId: PropTypes.string.isRequired,
  setCurrentCallToActionId: PropTypes.func.isRequired,
  isDefaultCallToAction: PropTypes.bool.isRequired,
  setIsDefaultCallToAction: PropTypes.func.isRequired,
  setSavedCallToAction: PropTypes.func,
  callToActions: PropTypes.array,
  setCallToActions: PropTypes.func.isRequired,
  updatePost: PropTypes.func,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}

PostCallToActionCheckboxSelect.defaultProps = {
  post: null,
  campaignType: 'all',
  setSavedCallToAction: () => {},
  callToActions: [],
  updatePost: () => {},
  isDisabled: false,
  className: null,
}

export default PostCallToActionCheckboxSelect
