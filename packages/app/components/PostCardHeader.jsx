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
      <p className="flex items-center mb-0 text-sm">
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline no--hover"
        >
          Originally posted <span className="font-bold">{publishedDate}</span> on <span className={`font-bold ${platform === 'facebook' ? 'text-fb' : 'text-insta'}`}>{utils.capitalise(platform)}</span>
        </a>
        {postType === 'story' && (
          <strong className="text-xs ml-2 text-insta">story</strong>
        )}
      </p>
      <PostCardPriorityButton
        postId={postId}
        artistId={artistId}
        priorityEnabled
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
  className: PropTypes.string,
}

PostCardHeader.defaultProps = {
  className: null,
}

export default PostCardHeader
