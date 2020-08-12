import React from 'react'
import PropTypes from 'prop-types'

import CloseCircle from '@/icons/CloseCircle'

import TournamentsItemMetrics from '@/app/TournamentsItemMetrics'
import TournamentsItemLinks from '@/app/TournamentsItemLinks'

const TournamentsItemDetails = ({
  adMetrics,
  isAdPair,
  currency,
  linkA,
  linkB,
  switchViews,
  className,
}) => {
  return (
    <div className={['bg-white md:bg-transparent col-span-7 col-start-6', className].join(' ')}>
      <div className="md:max-w-md lg:max-w-lg ml-auto mr-0">
        <TournamentsItemMetrics
          adMetrics={adMetrics}
          isAdPair={isAdPair}
          currency={currency}
          className={['text-center mb-4 pl-10'].join(' ')}
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
  adMetrics: PropTypes.array.isRequired,
  isAdPair: PropTypes.bool.isRequired,
  currency: PropTypes.string,
  switchViews: PropTypes.func.isRequired,
  linkA: PropTypes.string,
  linkB: PropTypes.string,
  className: PropTypes.string,
}

TournamentsItemDetails.defaultProps = {
  currency: '',
  linkA: null,
  linkB: null,
  className: null,
}


export default TournamentsItemDetails
