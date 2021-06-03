import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import PostCardPriorityButton from '@/app/PostCardPriorityButton'

const PostCardHeader = ({
  platform,
  date,
  permalink,
  postType,
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
          Originally posted <strong>{publishedDate}</strong> on <span className="text-insta">{platform}</span>
        </a>
        {postType === 'story' && (
          <strong className="text-xs ml-2 text-insta">story</strong>
        )}
      </p>
      <PostCardPriorityButton priorityEnabled />
    </div>
  )
}

PostCardHeader.propTypes = {
  platform: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  postType: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostCardHeader.defaultProps = {
  className: null,
}

export default PostCardHeader
