import React from 'react'
import PropTypes from 'prop-types'

import usePrevious from 'use-previous'
import { useAsync } from 'react-async'

import { ArtistContext } from '@/contexts/ArtistContext'

import Button from '@/elements/Button'

import styles from '@/app/PostItem.module.css'

import * as postsHelpers from '@/app/helpers/postsHelpers'

const getPromotionStatus = (promotableStatus) => {
  if (promotableStatus === 2) return true
  if (promotableStatus === -2) return false
  return null
}

const PostItemDisableWarning = ({
  postId,
  promotionEnabled,
  promotableStatus,
  togglePromotion,
}) => {
  const time = '10 minutes and 33 seconds'
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
    if (!promotionEnabled && previousPromotionEnabled === true) {
      showWarning()
    }
  }, [promotionEnabled, previousPromotionEnabled, showWarning])

  // REVERSE DISABLE POST
  const [reverseStatus, setReverseStatus] = React.useState(false)
  // (Set the post back to the previous enabled state)
  const { artistId } = React.useContext(ArtistContext)
  const { isPending } = useAsync({
    promiseFn: postsHelpers.updatePost,
    watch: reverseStatus,
    // The variable(s) to pass to promiseFn
    artistId,
    postId,
    promotionEnabled: getPromotionStatus(cachedPromtableStatus),
    disabled: !reverseStatus,
    onResolve: (post) => {
      if (!post) return
      // Hide warning
      setShow(false)
      // Update post list state
      const { promotion_enabled, promotable_status } = post
      togglePromotion(postId, promotion_enabled, promotable_status)
      // Reset reversed status
      setReverseStatus(false)
    },
  })

  return (
    <div
      className={[
        styles.postSection,
        'absolute top-0 left-0',
        'w-full h-full',
        'bg-white rounded-b-dialogue',
        !show ? 'hidden' : null,
      ].join(' ')}
      style={{ zIndex: 2 }}
    >
      <div className="text--block mb-8">
        <p>Ads containing this post will be switched off in {time}</p>
      </div>
      {/* BUTTONS */}
      <div className="flex justify-between pb-8">
        <Button
          className="w-32"
          version="black small"
          onClick={() => setShow(false)}
        >
          Ok
        </Button>
        <Button
          className="w-32 bg-red"
          version="black small"
          onClick={() => setReverseStatus(true)}
          loading={isPending}
        >
          Cancel
        </Button>
      </div>

    </div>
  )
}

PostItemDisableWarning.propTypes = {
  postId: PropTypes.string.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  promotableStatus: PropTypes.number.isRequired,
  togglePromotion: PropTypes.func.isRequired,
}

// PostItemDisableWarning.defaultProps = {
//   show: true,
// }


export default PostItemDisableWarning
