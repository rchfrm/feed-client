import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import { TournamentContext } from '@/app/contexts/TournamentContext'

import TournamentsItemDate from '@/app/TournamentsItemDate'
import TournamentsItemAdPair from '@/app/TournamentsItemAdPair'

import { copy } from '@/app/copy/tournamentsCopy'

const TournamentsItem = ({ tournament, lastTournament, className }) => {
  // Get streak data from tournaments
  const {
    dateCreated,
    winningAdId,
    streakWinnerIndex,
    isAdPair,
    nextIsAdPair,
    nextWinningAdIndex,
  } = tournament
  // CONTROL AD VIEW (ads or metrics) for narrow screens
  const [tournamentView, setTournamentView] = React.useState('ads')
  const switchViews = React.useCallback((view) => {
    const newView = tournamentView === 'ads' ? 'metrics' : 'ads'
    const newView = view || tournamentView === 'ads' ? 'metrics' : 'ads'
    setTournamentView(newView)
  }, [tournamentView])
  // GET DESKTOP LAYOUT TEST
  const { isDesktopLayout } = React.useContext(TournamentContext)

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* DATE */}
      <TournamentsItemDate
        className="mb-5"
        date={dateCreated}
      />
      {/* NO ADS */}
      {!tournament.adPosts.length ? (
        <div className="mb-40 md:mb-10 text-center md:text-left">
          <MarkdownText
            className="pt-1 md:pl-10 md:pr-5 ml-auto mr-0"
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
          isDesktopLayout={isDesktopLayout}
          tournamentView={tournamentView}
          className="TournamentsItemAdPair"
        />
      )}
    </div>
  )
}

TournamentsItem.propTypes = {
  tournament: PropTypes.object.isRequired,
  lastTournament: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TournamentsItem.defaultProps = {
  className: '',
}


export default TournamentsItem
