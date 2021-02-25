import React from 'react'
import PropTypes from 'prop-types'

import LightbulbIcon from '@/icons/LightbulbIcon'

const PostCardToggleTeaser = ({ className }) => {
  return (
    <div
      className={[
        'flex justify-center items-center',
        'w-8 h-8 bg-yellow rounded-full',
        className,
      ].join(' ')}
    >
      <LightbulbIcon className="w-4 h-auto" />
    </div>
  )
}

PostCardToggleTeaser.propTypes = {
  className: PropTypes.string,
}

PostCardToggleTeaser.defaultProps = {
  className: null,
}

export default PostCardToggleTeaser
