import React from 'react'
import PropTypes from 'prop-types'

import PostCardPriorityButton from '@/app/PostCardPriorityButton'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import * as utils from '@/helpers/utils'

const PostCardHeader = ({
  platform,
  publishedDate,
  permalink,
  postType,
  postId,
  artistId,
  priorityEnabled,
  updatePost,
  postIndex,
  className,
  promotionStatus,
}) => {
  const { featureFlags: { priorityEnabled: priorityFeatureEnabled } } = React.useContext(ArtistContext)
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
      {priorityFeatureEnabled && (
        <PostCardPriorityButton
          postId={postId}
          artistId={artistId}
          priorityEnabled={priorityEnabled}
          updatePost={updatePost}
          postIndex={postIndex}
          promotionStatus={promotionStatus}
        />
      )}
    </div>
  )
}

PostCardHeader.propTypes = {
  platform: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  postType: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  priorityEnabled: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
  postIndex: PropTypes.number.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostCardHeader.defaultProps = {
  className: null,
}

export default PostCardHeader
