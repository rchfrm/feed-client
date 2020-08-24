import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemMetrics from '@/app/TournamentsItemMetrics'
import TournamentsItemLinks from '@/app/TournamentsItemLinks'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'

const TournamentsItemDetails = ({
  adPosts,
  isAdPair,
  currency,
  className,
}) => {
  const [adA, adB] = adPosts
  const { data: dataA, postLink: linkA } = adA || {}
  const { data: dataB, postLink: linkB } = adB || {}
  // DEFINE AD METRICS ARRAY
  const adMetrics = React.useMemo(() => {
    return tournamentHelpers.getAdMetrics(dataA, dataB, isAdPair)
  }, [dataA, dataB, isAdPair])
  return (
    <div className={[className, 'TournamentsItemDetails'].join(' ')}>
      <TournamentsItemMetrics
        adMetrics={adMetrics}
        isAdPair={isAdPair}
        currency={currency}
        className={[
          'text-center',
          'pb-4',
        ].join(' ')}
      />
      <TournamentsItemLinks
        linkA={linkA}
        linkB={linkB}
      />
    </div>
  )
}

TournamentsItemDetails.propTypes = {
  adPosts: PropTypes.array.isRequired,
  isAdPair: PropTypes.bool.isRequired,
  currency: PropTypes.string,
  className: PropTypes.string,
}

TournamentsItemDetails.defaultProps = {
  currency: '',
  className: null,
}


export default TournamentsItemDetails
