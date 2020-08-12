import React from 'react'
import PropTypes from 'prop-types'

import SwiperBlock from '@/SwiperBlock'
import MarkdownText from '@/elements/MarkdownText'

import { TournamentContext } from '@/app/contexts/TournamentContext'

import TournamentsItemDate from '@/app/TournamentsItemDate'
import TournamentsItemAdPair from '@/app/TournamentsItemAdPair'
import TournamentsItemDetails from '@/app/TournamentsItemDetails'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'
import { copy } from '@/app/copy/tournamentsCopy'

const TournamentsItem = ({ tournament, lastTournament, currency, className }) => {
  // Get streak data from tournaments
  const {
    dateCreated,
    winningAdId,
    streakWinnerIndex,
    isAdPair,
    nextIsAdPair,
    nextWinningAdIndex,
  } = tournament
  // Get ad pairs
  const [adA, adB] = tournament.adPosts
  const { data: dataA, postLink: linkA } = adA || {}
  const { data: dataB, postLink: linkB } = adB || {}
  // DEFINE AD METRICS ARRAY
  const adMetrics = React.useMemo(() => {
    return tournamentHelpers.getAdMetrics(dataA, dataB, isAdPair)
  }, [dataA, dataB, isAdPair])
  // CONTROL SWIPER
  const [sliderIndex, setSliderIndex] = React.useState(0)
  const switchViews = React.useCallback(() => {
    const newSlideIndex = sliderIndex === 0 ? 1 : 0
    setSliderIndex(newSlideIndex)
  }, [sliderIndex])
  // GET DESKTOP LAYOUT TEST
  const { isDesktopLayout } = React.useContext(TournamentContext)

  return (
    <div
      className={[
        '',
        '-mt-26 first:mt-0 md:mt-0',
        className,
      ].join(' ')}
    >
      {/* DATE */}
      <TournamentsItemDate
        className="col-span-5 col-start-1 mb-5 md:pl-1"
        date={dateCreated}
      />
      {/* NO ADS */}
      {!tournament.adPosts.length ? (
        <div className="col-span-7 col-start-6 mb-40 md:mb-10 text-center md:text-left">
          <MarkdownText
            className="md:max-w-md lg:max-w-lg pt-1 md:pl-10 md:pr-5 ml-auto mr-0"
            markdown={copy.noTournamentAds}
          />
        </div>
      // ADS CONTENT
      ) : (
        <TournamentsItemAdPair
          adPosts={tournament.adPosts}
          isAdPair={isAdPair}
          winningAdId={winningAdId}
          streakWinnerIndex={streakWinnerIndex}
          nextIsAdPair={nextIsAdPair}
          nextWinningAdIndex={nextWinningAdIndex}
          lastTournament={lastTournament}
          switchViews={switchViews}
          className="swiper-slide col-span-5 col-start-1 TournamentsItemAdPair"
        >
          {/* METRICS & LINKS */}
          <TournamentsItemDetails
            adMetrics={adMetrics}
            isAdPair={isAdPair}
            currency={currency}
            linkA={linkA}
            linkB={linkB}
            switchViews={switchViews}
            className="swiper-slide"
          />
        </TournamentsItemAdPair>
      )}
    </div>
  )
}

TournamentsItem.propTypes = {
  tournament: PropTypes.object.isRequired,
  lastTournament: PropTypes.bool.isRequired,
  currency: PropTypes.string,
  className: PropTypes.string,
}

TournamentsItem.defaultProps = {
  className: '',
  currency: '',
}


export default TournamentsItem
