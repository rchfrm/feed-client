import React from 'react'
import PropTypes from 'prop-types'

const PostRejectedReason = ({ post }) => {
  const [reason] = Object.values(post.ads).reduce((reasons, ad) => {
    if (! ad?.ad_review_feedback?.global) {
      return reasons
    }
    return [...reasons, Object.keys(ad?.ad_review_feedback?.global)[0]]
  }, [])

  return (
    <div
      className={[
        'mt-2.5 p-1.5',
        'bg-red-bg-dark border-red rounded-dialogue',
        'text-red-text text-[10px] text-center',
      ].join(' ')}
    >
      {reason || 'Unknown'}
    </div>
  )
}

PostRejectedReason.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostRejectedReason
