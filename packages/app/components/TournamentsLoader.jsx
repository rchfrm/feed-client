import React from 'react'
import PropTypes from 'prop-types'

import { useAsync } from 'react-async'
import { useImmerReducer } from 'use-immer'

import TournamentsItem from '@/app/TournamentsItem'
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import * as server from '@/helpers/sharedServer'
import * as tournamentHelpers from '@/helpers/tournamentHelpers'

// DATA REDUCER
const initialDataState = []
const dataReducer = (draftState, action) => {
  const { type: actionType, payload = {} } = action
  const { newData = [] } = payload
  const firstIncomingTournament = newData[0]
  switch (actionType) {
    case 'replace-data':
      return newData
    case 'reset-data':
      return initialDataState
    case 'add-data':
      // Update streak positions on last old tournament
      tournamentHelpers.setLastStreakPosition(draftState[draftState.length - 1], firstIncomingTournament)
      // Add new tournaments to list
      draftState.push(...newData)
      break
    default:
      return draftState
  }
}

// SERVER FETCHER
const fetcher = async ({ artistId, audienceId, offset }) => {
  if (!artistId) return []
  // GET ALL ARTIST TOURNAMENTS
  return server.getArtistTournaments({
    artistId,
    audienceId,
    expand: true,
    offset: offset.current,
  })
}

// UPDATE DATA CONDITION
const updateDataConditions = (newProps, oldProps) => {
  const { artistId: newArtistId, audienceId: newAudienceId, loadingMore } = newProps
  const { artistId: oldArtistId, audienceId: oldAudienceId, loadingMore: alreadyLoadingMore } = oldProps
  if (loadingMore && !alreadyLoadingMore) return true
  if (newArtistId !== oldArtistId) return true
  if (newAudienceId !== oldAudienceId) return true
  return false
}

const TournamentsLoader = ({ audienceId }) => {
  const { artistId, artistLoading, artistCurrency } = React.useContext(ArtistContext)
  const [tournaments, setTournaments] = useImmerReducer(dataReducer, initialDataState)
  const [error, setError] = React.useState(null)
  const offset = React.useRef(0)
  const initialLoad = React.useRef(true)
  const [loadingMore, setLoadingMore] = React.useState(false)
  const [loadedAll, setLoadedAll] = React.useState(false)

  // Import interface context
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  // WHEN CHANGING ARTIST or AUDIENCE ID...
  React.useEffect(() => {
    if (!artistId) return
    // Reset initial load
    initialLoad.current = true
    // Reset offset
    offset.current = 0
    // Update end of assets state
    setLoadedAll(false)
  }, [artistId, audienceId])

  // TOURNAMENT COUNT
  const totalTournaments = React.useMemo(() => {
    return tournaments.length
  }, [tournaments])


  // FETCH DATA
  // Run this to fetch posts when the artist changes
  const { isPending } = useAsync({
    promiseFn: fetcher,
    watchFn: updateDataConditions,
    // The variable(s) to pass to promiseFn
    artistId,
    audienceId,
    offset,
    loadedAll,
    loadingMore,
    // When fetch finishes
    onResolve: (data) => {
      // Turn off global loading
      toggleGlobalLoading(false)
      // Handle result...
      if (!data || !data.length) {
        setLoadedAll(true)
        setLoadingMore(false)
        // Handle no posts on initial load
        if (initialLoad.current) {
          setTournaments({ type: 'reset-data' })
        }
        // Define initial load
        initialLoad.current = false
        return
      }
      // Update offset
      offset.current += data.length
      const formattedTournaments = tournamentHelpers.handleNewTournaments({
        incomingTournaments: data,
      })
      // Handle adding data
      if (loadingMore) {
        // Stop loading
        setLoadingMore(false)
        // Update posts
        setTournaments({
          type: 'add-data',
          payload: { newData: formattedTournaments },
        })
        return
      }
      // Handle replacing data
      setTournaments({
        type: 'replace-data',
        payload: { newData: formattedTournaments },
      })
      // Define initial load
      initialLoad.current = false
    },
    // Handle errors
    onReject(error) {
      setError(error)
      toggleGlobalLoading(false)
    },
  })

  // Define function for loading more posts
  const loadMorePosts = React.useCallback(() => {
    setLoadingMore(true)
  }, [])

  // Load more Tournaments
  const scrollTriggerLoad = React.useCallback(([target]) => {
    if (target.isIntersecting && !loadingMore && !loadedAll) {
      loadMorePosts()
    }
  }, [loadMorePosts, loadingMore, loadedAll])

  // Setup intersection observer
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

  // Stop here if loading
  if (artistLoading || (isPending && initialLoad.current)) {
    return (
      <div className="pt-20 pb-10">
        <Spinner />
      </div>
    )
  }

  if (error) return <Error error={error} />

  return (
    <section className="pt-10">
      {tournaments.map((tournament, index) => {
        const lastTournament = index === totalTournaments - 1
        return (
          <React.Fragment key={tournament.id}>
            <TournamentsItem
              tournament={tournament}
              lastTournament={lastTournament}
              currency={artistCurrency}
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
