import React from 'react'
import PropTypes from 'prop-types'

const PostCardToggle = ({
  postId,
  audienceSlug,
  disabled,
  className,
}) => {
  return (
    <div
      className={[
        'relative',
        'rounded-dialogue bg-grey-1',
        className,
      ].join(' ')}
    >
      <p className="mb-0 flex items-center">
        <div
          className={[
            'w-4 h-4 rounded-full',
            audienceSlug === 'growth' ? 'bg-yellow' : 'bg-red',
          ].join(' ')}
        />
        <strong
          className="capitalize ml-4"
          style={{ transform: 'translate(-1px, 1px)' }}
        >
          {audienceSlug}
        </strong>
      </p>
    </div>
  )
}

PostCardToggle.propTypes = {
  postId: PropTypes.object.isRequired,
  audienceSlug: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

PostCardToggle.defaultProps = {
  disabled: false,
  className: null,
}

export default PostCardToggle
