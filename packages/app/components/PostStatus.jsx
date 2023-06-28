import React from 'react'
import PropTypes from 'prop-types'
import { getPostStatus } from '@/app/helpers/postsHelpers'

const PostStatus = ({ post, status }) => {
  const postStatus = getPostStatus(post, status)
  const isInReview = post.promotionStatus === 'in_review'

  if (! postStatus) {
    return
  }

  return (
    <div
      className={[
        'mt-2.5 p-1.5',
        isInReview ? 'bg-yellow-bg-dark border-yellow text-yellow-text' : 'bg-red-bg-dark border-red text-red-text',
        'border border-solid rounded-dialogue',
        'text-[10px] text-center',
        'truncate',
      ].join(' ')}
    >
      {postStatus}
    </div>
  )
}

PostStatus.propTypes = {
  post: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
}

export default PostStatus
