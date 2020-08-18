import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import { TournamentContext } from '@/app/contexts/TournamentContext'

import TournamentsItemDateStatus from '@/app/TournamentsItemDateStatus'
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
    const newView = view || (tournamentView === 'ads' ? 'metrics' : 'ads')
    setTournamentView(newView)
  }, [tournamentView])
  // GET DESKTOP LAYOUT TEST
  const { isDesktopLayout } = React.useContext(TournamentContext)
  // GET EL REF
  const tournamentsItemEl = React.useRef(null)
  return (
    <div
      className={[
        className,
        'pb-10 xs:pb-16',
      ].join(' ')}
    >
      {/* DATE */}
      <TournamentsItemDateStatus
        date={dateCreated}
        status={tournament.status}
        className="mb-8 xs:mb-5"
      />
      {/* NO ADS */}
      {!tournament.adPosts.length ? (
        <div className="max-w-lg mx-auto mb-20 pt-2 md:pt-5 text-center">
          <MarkdownText markdown={copy.noTournamentAds} />
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
          tournamentsItemEl={tournamentsItemEl.current}
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
