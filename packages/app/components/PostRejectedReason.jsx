import React from 'react'
import PropTypes from 'prop-types'

const PostRejectedReason = ({ post }) => {
  const reason = Object.values(post.ads).reduce((reason, ad) => {
    if (! ad?.ad_review_feedback?.global) {
      return reason
    }
    return Object.keys(ad?.ad_review_feedback?.global)[0]
  }, '')

  if (! reason) {
    return
  }

  return (
    <div
      className={[
        'mt-2.5 p-1.5',
        'bg-red-bg-dark border-red rounded-dialogue',
        'text-red-text text-[10px] text-center',
      ].join(' ')}
    >
      {reason}
    </div>
  )
}

PostRejectedReason.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostRejectedReason
