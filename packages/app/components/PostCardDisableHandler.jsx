import React from 'react'
import PropTypes from 'prop-types'

import usePrevious from 'use-previous'
import { useAsync } from 'react-async'

import PostCardDisableAlert from '@/app/PostCardDisableAlert'

import * as postsHelpers from '@/app/helpers/postsHelpers'

const getPromotionStatus = (promotableStatus) => {
  if (promotableStatus === 2) return true
  if (promotableStatus === -2) return false
  return null
}

const PostCardDisableHandler = ({
  post,
  postToggleSetterType,
  artistId,
  toggleCampaign,
  isEnabled,
  setIsEnabled,
}) => {
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [reverseStatus, setReverseStatus] = React.useState(false)
  const [cachedPromotableStatus, setCachedPromotableStatus] = React.useState()
  // Extract some variables from the post object
  const {
    id: postId,
    promotableStatus,
  } = post
  const previousEnabled = usePrevious(isEnabled)
  const previousPromotableStatus = usePrevious(promotableStatus)

  const onConfirm = React.useCallback(() => {
    setShouldShowAlert(false)
  }, [])

  const onCancel = React.useCallback(() => {
    setReverseStatus(true)
  }, [])

  // REVERSE DISABLE POST (Set the post back to the previous enabled state)
  useAsync({
    promiseFn: postsHelpers.updatePost,
    watch: reverseStatus,
    // The variable(s) to pass to promiseFn
    artistId,
    postId,
    promotionEnabled: getPromotionStatus(cachedPromotableStatus),
    disabled: !reverseStatus,
    onResolve: ({ res: postUpdated, error }) => {
      setShouldShowAlert(false)
      // Reset reversed status
      setReverseStatus(false)
      // Hide warning
      if (error) return
      // Update post list state
      const { promotion_enabled, promotable_status } = postUpdated
      toggleCampaign(postId, promotion_enabled, promotable_status)
      // Update local toggle state
      setIsEnabled(promotion_enabled)
    },
  })

  const showAlert = React.useCallback(() => {
    setCachedPromotableStatus(previousPromotableStatus)
    setShouldShowAlert(true)
  }, [previousPromotableStatus])

  React.useEffect(() => {
    if (postToggleSetterType === 'single' && !isEnabled && previousEnabled) {
      showAlert()
    }
  }, [isEnabled, previousEnabled, postToggleSetterType, showAlert])

  return (
    <PostCardDisableAlert
      show={shouldShowAlert}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  )
}

PostCardDisableHandler.propTypes = {
  post: PropTypes.object.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  setIsEnabled: PropTypes.func.isRequired,
}

PostCardDisableHandler.defaultProps = {
}

export default PostCardDisableHandler
