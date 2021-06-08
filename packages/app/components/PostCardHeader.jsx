import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import PostCardPriorityButton from '@/app/PostCardPriorityButton'

import * as utils from '@/helpers/utils'

const PostCardHeader = ({
  platform,
  date,
  permalink,
  postType,
  postId,
  artistId,
  priorityEnabled,
  updatePost,
  postIndex,
  className,
}) => {
  const publishedDate = moment(date).format('DD MMM')
  return (
    <div
      className={[
        'flex justify-between items-bottom',
        className,
      ].join(' ')}
    >
      {/* LINK TO THE ORIGINAL POST */}
      <p className="flex items-center mb-0 text-sm bmw:text-base">
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline no--hover"
        >
          Original post: <span className="font-bold">{publishedDate}</span>, <span className={`font-bold ${platform === 'facebook' ? 'text-fb' : 'text-insta'}`}>{utils.capitalise(platform)} </span>
          {postType === 'story' && (
            <strong className="text-insta">Story</strong>
          )}
        </a>
      </p>
      <PostCardPriorityButton
        postId={postId}
        artistId={artistId}
        priorityEnabled={priorityEnabled}
        updatePost={updatePost}
        postIndex={postIndex}
      />
    </div>
  )
}

PostCardHeader.propTypes = {
  platform: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  postType: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  priorityEnabled: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
  postIndex: PropTypes.number.isRequired,
  className: PropTypes.string,
}

PostCardHeader.defaultProps = {
  className: null,
}

export default PostCardHeader
