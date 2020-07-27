import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import TournamentsItem from '@/app/TournamentsItem'
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import * as server from '@/helpers/sharedServer'
import * as tournamentHelpers from '@/helpers/tournamentHelpers'

const fetcher = async (artistId, offset) => {
  if (!artistId) return []
  // GET ALL ARTIST TOURNAMENTS
  return server.getArtistTournaments({ artistId, expand: true, offset })
}

const TournamentsLoader = ({ audienceId }) => {
  const { artistId, artistCurrency } = React.useContext(ArtistContext)
  const [offset, setOffset] = React.useState(0)
  const { data, error } = useSWR(
    [artistId, offset],
    fetcher,
  )

  const [tournaments, setTournaments] = React.useState([])

  // Turn off global loading if error
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    if (error) toggleGlobalLoading(false)
  }, [toggleGlobalLoading, error])

  // FILTERED TOURNAMENTS
  const tournamentsFiltered = React.useMemo(() => {
    if (!tournaments) return []
    return tournamentHelpers.filterTournaments(tournaments, audienceId)
  }, [tournaments, audienceId])

  // ARRAY OF TOURNAMENT IDs
  const tournamentIds = React.useMemo(() => {
    if (!tournaments) return []
    return tournaments.map(({ id }) => id)
  }, [tournaments])

  // PAGINATION
  const [loadingMore, setLoadingMore] = React.useState(false)
  const [loadedAll, setLoadedAll] = React.useState(false)
  // Update tournaments when data loads
  React.useEffect(() => {
    // Stop here if no data
    if (!data) return
    // Turn off global loading
    toggleGlobalLoading(false)
    // Turn off loading more
    setLoadingMore(false)
    // Update Tournaments data
    const updatedTournaments = data.reduce((updatedList, tournament) => {
      // Add tournament if not already present
      const { id } = tournament
      if (tournamentIds.includes(id)) return updatedList
      return [...updatedList, tournament]
    }, tournaments)
    setTournaments(updatedTournaments)
    // Set finished loading
    if (data.length < 20) {
      setLoadedAll(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, toggleGlobalLoading, setLoadingMore])
  // Count total tournaments and filtered tournaments
  const totalTournaments = React.useMemo(() => {
    return tournaments.length
  }, [tournaments])
  const totalFilteredTournaments = tournamentsFiltered.length
  // Load more Tournaments
  const loadMore = (entries) => {
    const target = entries[0]
    if (target.isIntersecting && !loadingMore && !loadedAll) {
      setLoadingMore(true)
      setOffset(totalTournaments)
    }
  }
  // Setup intersection observer
  const loadTrigger = React.useRef(null)
  React.useEffect(() => {
    const loadTriggerEl = loadTrigger.current
    // Create observer
    const observer = new IntersectionObserver(loadMore)
    // observe the loader
    if (loadTrigger && loadTrigger.current) {
      observer.observe(loadTrigger.current)
    }
    // clean up
    return () => {
      if (loadTriggerEl) {
        observer.unobserve(loadTriggerEl)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTournaments])

  // Stop here before data is ready
  if (!tournaments) return null

  // Stop here if no tournaments
  if (tournaments && !tournaments.length) {
    return (
      <p>No Tournaments found</p>
    )
  }

  if (error) return <Error error={error} />

  return (
    <section className="pt-10">
      <p>Total Ts {totalTournaments}</p>
      <p>Total Filtered Ts {totalFilteredTournaments}</p>

      {tournamentsFiltered.map((tournament, index) => {
        return (
          <React.Fragment key={tournament.id}>
            <TournamentsItem
              tournamentProps={tournament}
              artistCurrency={artistCurrency}
              className="mb-24"
            />
            {/* LOAD MORE TRIGGER */}
            {
              totalFilteredTournaments
              && index === totalFilteredTournaments - 1
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
        <div className="text-center pb-10">
          <div className="inline-block w-10">
            <Spinner />
          </div>
        </div>
      )}
    </section>
  )
}

TournamentsLoader.propTypes = {
  audienceId: PropTypes.string.isRequired,
}

export default TournamentsLoader
