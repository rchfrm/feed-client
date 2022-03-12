import React from 'react'
import PropTypes from 'prop-types'

import { growthGradient } from '@/app/helpers/postsHelpers'

const PostCardLabel = ({
  copy,
  className,
  style,
}) => {
  return (
    <span
      className={[
        'mb-0 ml-3 px-2 py-1 text-xs rounded-full',
        className,
      ].join(' ')}
      style={{
        ...style,
        background: growthGradient,
        padding: '0.1rem 0.4rem',
      }}
    >
      {copy}
    </span>
  )
}

PostCardLabel.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

PostCardLabel.defaultProps = {
  className: null,
  style: {},
}

export default React.memo(PostCardLabel)
