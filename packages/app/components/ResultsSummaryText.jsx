import React from 'react'
import PropTypes from 'prop-types'

import { formatNumber } from '@/helpers/utils'

const underlineClasses = 'border-solid border-b-4'

const ResultsSummaryText = ({
  totalEngagements,
  totalVisitors,
  roasMultiplier,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h3
        className={[
          'font-body',
          'text-xl xxs:text-2xl lg:text-3xl',
          'minContent:-mt-6 md:mt-0',
        ].join(' ')}
        style={{ lineHeight: '1.8em' }}
      >
        You've engaged
        {' '}
        <span className={`${underlineClasses} border-twitter`}>
          {formatNumber(totalEngagements)} new people
        </span>
        {!roasMultiplier ? ' and ' : ', '}
        <span className={`${underlineClasses} border-yellow`}>
          {formatNumber(totalVisitors)} have visited your websites
        </span>
        {roasMultiplier && (
          <>
            ,{' '}
            and you've made a return of
            {' '}
            <span className={`${underlineClasses} border-red`}>
              ×{roasMultiplier} on your conversion ads
            </span>
          </>
        )}
        .
      </h3>
    </div>
  )
}

ResultsSummaryText.propTypes = {
  totalEngagements: PropTypes.number.isRequired,
  totalVisitors: PropTypes.number.isRequired,
  roasMultiplier: PropTypes.number,
  className: PropTypes.string,
}

ResultsSummaryText.defaultProps = {
  roasMultiplier: null,
  className: null,
}

export default ResultsSummaryText
