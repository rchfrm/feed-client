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
  postType,
  platform,
  paidEs,
  promotionEnabled,
  promotableStatus,
  toggleCampaign,
  postToggleSetterType,
  artistId,
  textClassName,
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
      toggleCampaign(postId, promotion_enabled, promotable_status)
    },
  })
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div
        className={[
          'absolute top-0 left-0',
          '-mt-12',
          'w-full h-full',
          'bg-white',
          'flex flex-col justify-between',
          className,
        ].join(' ')}
        style={{ zIndex: 3 }}
      >
        <div
          className={[
            'bg-grey-1 rounded-dialogue',
            'mb-2',
            textClassName,
          ].join(' ')}
        >
          <MarkdownText markdown={copy.postStatusConfirmation} className="mb-0" />
        </div>
        {/* BUTTONS */}
        <div className="flex w-full">
          <Button
            className="h-11 w-1/2 mr-1"
            version="black"
            onClick={() => {
              setShow(false)
              // TRACK
              track('disable_active_ad', {
                postType,
                platform,
                paidEs,
              })
            }}
          >
            Ok
          </Button>
          <Button
            className="h-11 w-1/2 ml-1"
            version="red"
            onClick={() => {
              setReverseStatus(true)
            }}
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
  postType: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  paidEs: PropTypes.number,
  promotionEnabled: PropTypes.bool.isRequired,
  promotableStatus: PropTypes.number.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  postToggleSetterType: PropTypes.string,
  artistId: PropTypes.string.isRequired,
  textClassName: PropTypes.string,
  className: PropTypes.string,
}

PostCardDisableWarning.defaultProps = {
  paidEs: null,
  postToggleSetterType: '',
  textClassName: null,
  className: null,
}

export default PostCardDisableWarning
