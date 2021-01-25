import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'
import TournamentsItem from '@/app/TournamentsItem'

import { TournamentContext } from '@/app/contexts/TournamentContext'

const TournamentsAll = ({
  tournaments,
  loadingMore,
  loadMorePosts,
  loadedAll,
}) => {
  const totalTournaments = tournaments.length
  // UPDATE ITEM SIZE WHEN MORE ITEMS ARE LOADED
  const { updateSizes } = React.useContext(TournamentContext)
  React.useEffect(() => {
    updateSizes()
  }, [tournaments.length, updateSizes])
  // RUN THIS to LOAD MORE TOURNAMENTS
  const scrollTriggerLoad = React.useCallback(([target]) => {
    if (target.isIntersecting && !loadingMore && !loadedAll) {
      loadMorePosts()
    }
  }, [loadMorePosts, loadingMore, loadedAll])
  // SETUP INTERSECTION OBSERVER
  const loadTrigger = React.useRef(null)
  React.useEffect(() => {
    const loadTriggerEl = loadTrigger.current
    // Create observer
    const observer = new IntersectionObserver(scrollTriggerLoad)
    // observe the loader
    if (loadTriggerEl) {
      observer.observe(loadTrigger.current)
    }
    // clean up
    return () => {
      if (loadTriggerEl) {
        observer.unobserve(loadTriggerEl)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTournaments, scrollTriggerLoad, loadedAll])
  return (
    <section
      className={[
        'breakout--width',
        'xs:ml-0 xs:w-full',
        'px-6 xs:px-0',
        'overflow-hidden',
        'pt-2',
      ].join(' ')}
    >
      {tournaments.map((tournament, index) => {
        const lastTournament = index === totalTournaments - 1
        return (
          <React.Fragment key={tournament.id}>
            <TournamentsItem
              tournament={tournament}
              lastTournament={lastTournament}
            />
            {/* LOAD MORE SCROLL TRIGGER */}
            {
              totalTournaments
              && index === totalTournaments - 1
              && !loadedAll
              && (
                <div ref={loadTrigger} />
              )
            }
          </React.Fragment>
        )
      })}
      {/* LOADING MORE SPINNER */}
      {loadingMore && (
        <div className="text-center md:pt-16 pb-10">
          <div className="inline-block w-10">
            <Spinner />
          </div>
        </div>
      )}
    </section>
  )
}

TournamentsAll.propTypes = {
  tournaments: PropTypes.array,
  loadingMore: PropTypes.bool,
  loadMorePosts: PropTypes.func.isRequired,
  loadedAll: PropTypes.bool.isRequired,
}

TournamentsAll.defaultProps = {
  tournaments: [],
  loadingMore: false,
}


export default TournamentsAll
