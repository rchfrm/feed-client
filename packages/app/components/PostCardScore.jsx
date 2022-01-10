import PropTypes from 'prop-types'
import React from 'react'

import PostCardLabel from '@/app/PostCardLabel'
import StarIcon from '@/icons/StarIcon'

import brandColors from '@/constants/brandColors'

const PostCardScore = ({
  scoreOrganic,
  className,
}) => {
  return (
    <div
      className={[
        className,
        'flex justify-between items-center',
        'rounded-dialogue',
        'border-solid border-2 border-green',
      ].join(' ')}
    >
      <div className="flex items-center mb-0">
        <StarIcon className="h-4 w-auto" fill={brandColors.green} style={{ transform: 'translateY(-1px)' }} />
        <span className="ml-3" style={{ transform: 'translateY(-1px)' }}>Score</span>
        <PostCardLabel
          copy="organic"
          className="bg-green"
        />
      </div>
      <span className="flex items-baseline mb-0">
        <span className="font-bold">{scoreOrganic}</span>
        <span className="ml-1 text-xs">/ 10</span>
      </span>
    </div>
  )
}

PostCardScore.propTypes = {
  scoreOrganic: PropTypes.number.isRequired,
  className: PropTypes.string,
}

PostCardScore.defaultProps = {
  className: null,
}

export default React.memo(PostCardScore)
