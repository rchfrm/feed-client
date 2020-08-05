import React from 'react'
import PropTypes from 'prop-types'

import SwiperBlock from '@/SwiperBlock'
import CloseCircle from '@/icons/CloseCircle'

import TournamentsItemDate from '@/app/TournamentsItemDate'
import TournamentsItemAdPair from '@/app/TournamentsItemAdPair'
import TournamentsItemMetrics from '@/app/TournamentsItemMetrics'
import TournamentsItemLinks from '@/app/TournamentsItemLinks'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'

import styles from '@/app/Tournaments.module.css'

const TournamentsItem = ({ tournament, lastTournament, currency, className }) => {
  // Get streak data from tournaments
  const {
    dateCreated,
    winningAdId,
    winningAdIndex,
    streakWinnerIndex,
    streakWinnerId,
    nextStreakWinnerIndex,
    isAdPair,
    nextIsAdPair,
    nextWinningAdIndex,
  } = tournament
  // Get ad pairs
  const [adA, adB] = tournament.adPosts
  const { data: dataA, postLink: linkA } = adA
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
  // On resize
  const isDesktopLayout = useBreakpointTest('md')

  return (
    <div
      className={[
        'md:grid grid-cols-12 col-gap-5',
        '-mt-26 first:mt-0 md:mt-0',
        'max-w-lg mx-auto md:max-w-full',
        className,
      ].join(' ')}
    >
      {/* DATE */}
      <TournamentsItemDate
        className="col-span-5 col-start-1 mb-5 md:pl-1"
        date={dateCreated}
      />
      {/* CONTENT */}
      <SwiperBlock
        containerClass="col-span-6 col-start-4"
        listClass="mb-0"
        goToSlide={sliderIndex}
        onSlideChange={({ activeIndex }) => setSliderIndex(activeIndex)}
        disable={isDesktopLayout}
      >
        {/* AD PAIR */}
        <TournamentsItemAdPair
          adPosts={tournament.adPosts}
          isAdPair={isAdPair}
          winningAdId={winningAdId}
          streakWinnerIndex={streakWinnerIndex}
          nextIsAdPair={nextIsAdPair}
          nextWinningAdIndex={nextWinningAdIndex}
          lastTournament={lastTournament}
          switchViews={switchViews}
          isDesktopLayout={isDesktopLayout}
          className="swiper-slide col-span-5 col-start-1 TournamentsItemAdPair"
        />
        {/* METRICS & LINKS */}
        <div className={['swiper-slide bg-white md:bg-transparent col-span-7 col-start-6'].join(' ')}>
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
      </SwiperBlock>
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
