import React from 'react'
import PropTypes from 'prop-types'

import { getPostContent } from '@/helpers/tournamentHelpers'
import { formatNumber } from '@/helpers/utils'

import StarIcon from '@/icons/StarIcon'

import PostImage from '@/PostImage'

import brandColors from '@/constants/brandColors'

const FunnelAudienceAd = ({
  adData,
  winner,
  score,
  className,
}) => {
  const { thumbnailOptions, message } = React.useMemo(() => {
    const { asset } = adData
    const adCreative = Object.values(adData.adcreatives)[0]
    return getPostContent(adCreative, asset)
  }, [adData])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* IMAGE */}
      <div className="flex mb-2">
        <div className="w-24 xxs:w-28 xxs:w-32">
          <PostImage
            thumbnailOptions={thumbnailOptions}
            title={message}
          />
        </div>
      </div>
      {/* SCORE */}
      <div
        className={[
          'flex items-baseline justify-end',
        ].join(' ')}
      >
        <p
          className="mr-2 mb-0"
        >
          {formatNumber(score)}
        </p>
        <StarIcon
          className="w-auto"
          fill={winner ? brandColors.green : null}
          stroke={!winner ? brandColors.black : null}
          strokeWidth={25}
          style={{ height: '0.75rem' }}
        />
      </div>
    </div>
  )
}

FunnelAudienceAd.propTypes = {
  adData: PropTypes.object.isRequired,
  winner: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  className: PropTypes.string,
}

FunnelAudienceAd.defaultProps = {
  className: null,
}

export default FunnelAudienceAd
