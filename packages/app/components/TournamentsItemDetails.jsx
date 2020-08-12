import React from 'react'
import PropTypes from 'prop-types'

import CloseCircle from '@/icons/CloseCircle'

import TournamentsItemMetrics from '@/app/TournamentsItemMetrics'
import TournamentsItemLinks from '@/app/TournamentsItemLinks'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'

const TournamentsItemDetails = ({
  adPosts,
  isAdPair,
  currency,
  switchViews,
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
    <div className={['bg-white md:bg-transparent col-span-7 col-start-6', className].join(' ')}>
      <div className="md:max-w-md lg:max-w-lg ml-auto mr-0">
        <TournamentsItemMetrics
          adMetrics={adMetrics}
          isAdPair={isAdPair}
          currency={currency}
          className={['text-center mb-4'].join(' ')}
        />
        <TournamentsItemLinks
          linkA={linkA}
          linkB={linkB}
        />
        {/* CLOSE METRICS BUTTON */}
        <div className={['text-center mt-3', 'md:hidden'].join(' ')}>
          <button
            className="button--cross -hover"
            aria-label="Hide metrics"
            title="Hide metrics"
            onClick={switchViews}
          >
            <CloseCircle className="w-full h-auto" />
          </button>
        </div>
      </div>
    </div>
  )
}

TournamentsItemDetails.propTypes = {
  adPosts: PropTypes.array.isRequired,
  isAdPair: PropTypes.bool.isRequired,
  currency: PropTypes.string,
  switchViews: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TournamentsItemDetails.defaultProps = {
  currency: '',
  className: null,
}


export default TournamentsItemDetails
