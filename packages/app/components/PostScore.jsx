import React from 'react'
import PropTypes from 'prop-types'

const PostScore = ({ score, size, className }) => {
  const isSmall = size === 'small'

  return (
    <div className={[
      'absolute',
      'flex justify-center items-center',
      'rounded-full bg-white border-3 border-solid border-insta',
      'font-bold',
      isSmall ? 'w-8 h-8' : 'w-16 h-16 text-2xl',
      className,
    ].join(' ')}
    >
      {score}
      <div
        className={[
          'absolute -right-1 -bottom-1',
          'flex justify-center items-center',
          'bg-white rounded-full',
          'font-normal text-grey-3',
          isSmall ? 'w-3 h-3' : 'w-6 h-6 text-sm',
        ].join(' ')}
        style={{ fontSize: isSmall ? '8px' : null }}
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
  className: '',
}

export default PostScore
