import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'

const PostCardHeader = ({
  platform,
  date,
  permalink,
  className,
}) => {
  return (
    <div
      className={[
        'flex justify-between items-bottom',
        className,
      ].join(' ')}
    >
      {/* ICON */}
      <a
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ paddingLeft: 1 }}
      >
        <PlatformIcon
          className="w-5 h-auto"
          platform={platform}
        />
      </a>
      {/* DATE */}
      <p className="mb-0 text-sm">
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline no--hover"
        >
          {date}
        </a>
      </p>
    </div>
  )
}

PostCardHeader.propTypes = {
  platform: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostCardHeader.defaultProps = {
  className: null,
}

export default PostCardHeader
