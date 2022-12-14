import React from 'react'
import PropTypes from 'prop-types'
import usePrevious from 'use-previous'
import { useAsync } from 'react-async'
import PostDisableAlert from '@/app/PostDisableAlert'
import * as postsHelpers from '@/app/helpers/postsHelpers'

const getPromotionStatus = (promotableStatus) => {
  if (promotableStatus === 2) return true
  if (promotableStatus === -2) return false
  return null
}

const PostDisableHandler = ({
  post,
  artistId,
  toggleCampaign,
  isEnabled,
  setIsEnabled,
  campaignType,
}) => {
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [reverseStatus, setReverseStatus] = React.useState(false)
  const [cachedPromotableStatus, setCachedPromotableStatus] = React.useState()
  const isConversionsCampaign = campaignType === 'conversions'
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
    disabled: ! reverseStatus,
    campaignType,
    onResolve: ({ res: postUpdated, error }) => {
      setShouldShowAlert(false)
      // Reset reversed status
      setReverseStatus(false)
      // Hide warning
      if (error) return
      // Update post list state
      const { promotion_enabled, conversions_enabled, promotable_status } = postUpdated
      toggleCampaign(isConversionsCampaign ? conversions_enabled : promotion_enabled, promotable_status, campaignType, postId)
      // Update local toggle state
      setIsEnabled(isConversionsCampaign ? conversions_enabled : promotion_enabled)
    },
  })

  const showAlert = React.useCallback(() => {
    setCachedPromotableStatus(previousPromotableStatus)
    setShouldShowAlert(true)
  }, [previousPromotableStatus])

  React.useEffect(() => {
    if (! isEnabled && previousEnabled) {
      showAlert()
    }
  }, [isEnabled, previousEnabled, showAlert])

  return (
    <PostDisableAlert
      show={shouldShowAlert}
      onConfirm={onConfirm}
      onCancel={onCancel}
      campaignType={campaignType}
    />
  )
}

PostDisableHandler.propTypes = {
  post: PropTypes.object.isRequired,
  artistId: PropTypes.string.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  setIsEnabled: PropTypes.func.isRequired,
  campaignType: PropTypes.string.isRequired,
}

export default PostDisableHandler
