import PropTypes from 'prop-types'
import React from 'react'

import PostCardLabel from '@/app/PostCardLabel'
import StarIcon from '@/icons/StarIcon'

import brandColors from '@/constants/brandColors'

const PostCardScore = ({
  scorePaid,
  scoreOrganic,
  className,
}) => {
  const score = scorePaid || scoreOrganic
  const scoreType = scorePaid ? 'paid' : 'organic'
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
        <StarIcon className="h-4 w-auto" fill={brandColors.green} />
        <span
          className="ml-3"
          style={{ transform: 'translateY(1px)' }}
        >
          Score
        </span>
        <PostCardLabel
          copy={scoreType}
          className={scoreType === 'paid' ? 'bg-green text-white font-bold' : 'bg-grey-2'}
          style={{ transform: 'translateY(1px)' }}
        />
      </div>
      <p className="flex items-center mb-0 font-bold">
        {score}
      </p>
    </div>
  )
}

PostCardScore.propTypes = {
  scorePaid: PropTypes.number,
  scoreOrganic: PropTypes.number.isRequired,
  className: PropTypes.string,
}

PostCardScore.defaultProps = {
  scorePaid: 0,
  className: null,
}

export default React.memo(PostCardScore)
