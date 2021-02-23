import React from 'react'
import PropTypes from 'prop-types'

import StarIcon from '@/icons/StarIcon'

import brandColors from '@/constants/brandColors'

const PostCardMetricsScore = ({
  score,
  className,
}) => {
  return (
    <div
      className={[
        'flex items-center justify-center text-center',
        'h-40 w-40',
        'border-solid border-2 border-green rounded-full',
        className,
      ].join(' ')}
    >
      <div>
        <p className="mb-3 text-sm">Score</p>
        <p
          className={[
            'flex items-baseline',
            'mb-0',
            'font-bold text-2xl',
          ].join(' ')}
        >
          <StarIcon className="h-6 w-auto mr-2" fill={brandColors.green} />
          <span style={{ transform: 'translateY(-0.1rem)' }}>
            {score}
          </span>
        </p>
      </div>
    </div>
  )
}

PostCardMetricsScore.propTypes = {
  score: PropTypes.number,
  className: PropTypes.string,
}

PostCardMetricsScore.defaultProps = {
  score: 0,
  className: null,
}

export default PostCardMetricsScore
