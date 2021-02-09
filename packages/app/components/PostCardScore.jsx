import PropTypes from 'prop-types'
import React from 'react'

import TooltipButton from '@/elements/TooltipButton'
import StarIcon from '@/icons/StarIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/PostsPageCopy'

const PostCardScore = ({
  scorePaid,
  scoreOrganic,
  className,
}) => {
  const score = scorePaid || scoreOrganic
  const scoreType = scorePaid ? 'paid' : 'organic'
  const tooltipSlides = copy.scoreTooltip[scoreType]
  return (
    <div
      className={[
        className,
        'flex justify-between items-center',
        'rounded-dialogue',
        'border-solid border-2 border-green',
      ].join(' ')}
    >
      <p className="flex items-center mb-0">
        <StarIcon className="h-4 w-auto" fill={brandColors.green} />
        <span
          className="ml-3"
          style={{ transform: 'translateY(1px)' }}
        >
          Score
        </span>
        <TooltipButton
          slides={tooltipSlides}
          direction="top"
          trackLabel={`${scoreType} score`}
          buttonClasses="ml-1"
          buttonStyle={{ transform: 'translateY(1px)' }}
        />
      </p>
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

export default PostCardScore
