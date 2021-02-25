import PropTypes from 'prop-types'
import React from 'react'

import PostCardLabel from '@/app/PostCardLabel'
import StarIcon from '@/icons/StarIcon'

import brandColors from '@/constants/brandColors'

const PostCardScore = ({
  scorePaid,
  scoreOrganic,
  promotionStatus,
  className,
}) => {
  const scoreProps = React.useMemo(() => {
    const forcePaidScore = promotionStatus === 'active' || promotionStatus === 'archived'
    const scoreType = scorePaid || forcePaidScore ? 'paid' : 'organic'
    const score = scoreType === 'paid' ? (scorePaid || 'n/a') : scoreOrganic
    return {
      scoreType,
      score,
    }
  }, [scorePaid, scoreOrganic, promotionStatus])
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
          copy={scoreProps.scoreType}
          className={scoreProps.scoreType === 'paid' ? 'bg-green text-white font-bold' : 'bg-grey-2'}
        />
      </div>
      <p className="flex items-center mb-0 font-bold">
        {scoreProps.score}
      </p>
    </div>
  )
}

PostCardScore.propTypes = {
  scorePaid: PropTypes.number,
  scoreOrganic: PropTypes.number.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostCardScore.defaultProps = {
  scorePaid: 0,
  className: null,
}

export default React.memo(PostCardScore)
