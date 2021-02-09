import React from 'react'
import PropTypes from 'prop-types'

import { CSSTransition } from 'react-transition-group'
import usePrevious from 'use-previous'
import { useAsync } from 'react-async'

import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'

import copy from '@/app/copy/PostsPageCopy'
import * as postsHelpers from '@/app/helpers/postsHelpers'
import { track } from '@/app/helpers/trackingHelpers'

const getPromotionStatus = (promotableStatus) => {
  if (promotableStatus === 2) return true
  if (promotableStatus === -2) return false
  return null
}


const PostCardDisableWarning = ({
  postId,
  promotionEnabled,
  promotableStatus,
  togglePromotion,
  postToggleSetterType,
  artistId,
  className,
}) => {
  const previousPromotionEnabled = usePrevious(promotionEnabled)
  const previousPromotableStatus = usePrevious(promotableStatus)
  const [cachedPromtableStatus, setCachedPromtableStatus] = React.useState()
  const [show, setShow] = React.useState(false)

  // TOGGLE
  const showWarning = React.useCallback(() => {
    setShow(true)
    setCachedPromtableStatus(previousPromotableStatus)
  }, [previousPromotableStatus])
  React.useEffect(() => {
    if (
      !promotionEnabled
      && previousPromotionEnabled
      && postToggleSetterType === 'single'
    ) {
      showWarning()
    }
  }, [promotionEnabled, previousPromotionEnabled, postToggleSetterType, showWarning])

  // REVERSE DISABLE POST
  const [reverseStatus, setReverseStatus] = React.useState(false)
  // (Set the post back to the previous enabled state)
  const { isPending } = useAsync({
    promiseFn: postsHelpers.updatePost,
    watch: reverseStatus,
    // The variable(s) to pass to promiseFn
    artistId,
    postId,
    promotionEnabled: getPromotionStatus(cachedPromtableStatus),
    disabled: !reverseStatus,
    onResolve: ({ res: postUpdated, error }) => {
      // Reset reversed status
      setReverseStatus(false)
      // Hide warning
      setShow(false)
      if (error) return
      // Update post list state
      const { promotion_enabled, promotable_status } = postUpdated
      togglePromotion(postId, promotion_enabled, promotable_status)
    },
  })
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="slide-up"
      unmountOnExit
    >
      <div
        className={[
          'absolute top-0 left-0',
          'w-full h-full',
          'bg-white',
          className,
        ].join(' ')}
        style={{ zIndex: 2 }}
      >
        <MarkdownText markdown={copy.postStatusConfirmation} className="mb-8" />
        {/* BUTTONS */}
        <div className="flex justify-between">
          <Button
            className="w-24 sm:w-32"
            version="black x-small"
            onClick={() => {
              setShow(false)
              // TRACK
              track({
                action: 'disable_active_ad',
                category: 'post_settings',
              })
            }}
          >
            Ok
          </Button>
          <Button
            className="w-24 sm:w-32"
            version="red x-small"
            onClick={() => setReverseStatus(true)}
            loading={isPending}
          >
            Cancel
          </Button>
        </div>

      </div>
    </CSSTransition>
  )
}

PostCardDisableWarning.propTypes = {
  postId: PropTypes.string.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  promotableStatus: PropTypes.number.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  postToggleSetterType: PropTypes.string,
  artistId: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostCardDisableWarning.defaultProps = {
  postToggleSetterType: '',
  className: null,
}

export default PostCardDisableWarning
