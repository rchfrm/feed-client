import React from 'react'
import PropTypes from 'prop-types'

import PostCardMedia from '@/app/PostCardMedia'

const PostMedia = ({ post }) => {
  const {
    media,
    thumbnails,
    postType,
    organicMetrics,
  } = post

  return (
    <div className="relative">
      <PostCardMedia
        media={media}
        thumbnails={thumbnails}
        postType={postType}
      />
      <div className={[
        'absolute right-4 bottom-4',
        'w-16 h-16',
        'flex justify-center items-center',
        'rounded-full bg-white border-3 border-solid border-insta',
        'font-bold text-2xl',
      ].join(' ')}
      >
        {organicMetrics.normalizedScore}
        <div className={[
          'absolute -right-1 -bottom-1',
          'w-6 h-6',
          'flex justify-center items-center',
          'bg-white rounded-full',
          'font-normal text-sm text-grey-3',
        ].join(' ')}
        >
          10
        </div>
      </div>
    </div>
  )
}

PostMedia.propTypes = {
  post: PropTypes.object.isRequired,
}

PostMedia.defaultProps = {
}

export default PostMedia
