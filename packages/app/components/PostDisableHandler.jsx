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
  updatePost,
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

  useAsync({
    promiseFn: postsHelpers.togglePromotionEnabled,
    watch: reverseStatus,
    artistId,
    postId,
    promotionEnabled: getPromotionStatus(cachedPromotableStatus),
    disabled: ! reverseStatus,
    campaignType,
    onResolve: ({ res: updatedPost, error }) => {
      setShouldShowAlert(false)
      setReverseStatus(false)

      if (error) {
        return
      }

      const { promotionEnabled, conversionsEnabled, promotableStatus } = updatedPost

      updatePost({
        type: isConversionsCampaign ? 'toggle-conversion' : 'toggle-promotion',
        payload: {
          promotionEnabled: isConversionsCampaign ? conversionsEnabled : promotionEnabled,
          promotableStatus,
          newStatus: updatedPost.promotionEnabled ? 'pending' : 'inactive',
          post: updatedPost,
        },
      })
      setIsEnabled(isConversionsCampaign ? conversionsEnabled : promotionEnabled)
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
  updatePost: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  setIsEnabled: PropTypes.func.isRequired,
  campaignType: PropTypes.string.isRequired,
}

export default PostDisableHandler
