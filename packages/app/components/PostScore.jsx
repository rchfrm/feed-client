import React from 'react'
import PropTypes from 'prop-types'

const PostScore = ({ score, size, className }) => {
  const isSmall = size === 'small'

  return (
    <div className={[
      'absolute',
      'flex justify-center items-center',
      'rounded-full bg-offwhite border-3 border-solid border-insta',
      'font-bold',
      isSmall ? 'w-10 h-10' : 'w-16 h-16 text-2xl',
      className,
    ].join(' ')}
    >
      {score}
      <div
        className={[
          'absolute -right-1 -bottom-1',
          'flex justify-center items-center',
          'bg-offwhite rounded-full',
          'font-normal text-grey-dark',
          isSmall ? 'w-4 h-4' : 'w-6 h-6 text-sm',
        ].join(' ')}
        style={{ fontSize: isSmall ? '9px' : null }}
      >
        10
      </div>
    </div>
  )
}

PostScore.propTypes = {
  score: PropTypes.number.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
}

PostScore.defaultProps = {
  size: 'regular',
  className: null,
}

export default PostScore
