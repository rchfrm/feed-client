import React from 'react'
import PropTypes from 'prop-types'
import { formatAdRejectionReason } from '@/app/helpers/postsHelpers'

const PostNotPromotableReason = ({ post, status }) => {
  const { isPromotable, notPromotableReason } = post
  const isRejected = status === 'rejected'

  const [reason] = Object.values(post?.ads || {}).reduce((reasons, ad) => {
    if (! ad?.ad_review_feedback?.global) {
      return reasons
    }
    return [...reasons, Object.keys(ad?.ad_review_feedback?.global)[0]]
  }, [])

  const formattedReason = formatAdRejectionReason(reason)

  if (! isRejected && ! isPromotable && ! notPromotableReason) {
    return
  }

  return (
    <div
      className={[
        'mt-2.5 p-1.5',
        'bg-red-bg-dark border-red rounded-dialogue',
        'text-red-text text-[10px] text-center',
        'truncate',
      ].join(' ')}
    >
      {isRejected ? formattedReason || 'Unknown' : notPromotableReason}
    </div>
  )
}

PostNotPromotableReason.propTypes = {
  post: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
}

export default PostNotPromotableReason
