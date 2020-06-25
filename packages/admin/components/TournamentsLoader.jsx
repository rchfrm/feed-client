import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import TournamentFilters from '@/admin/TournamentFilters'
import TournamentOverview from '@/admin/TournamentOverview'

import * as server from '@/admin/helpers/server'
import { useUser } from '@/admin/hooks/useUser'

const fetcher = (artistId, token) => {
  if (!artistId || !token) return []
  return server.getArtistTournaments(artistId, token)
}

const TournamentsLoader = ({ artistId }) => {
  const { user } = useUser()
  const { data: tournaments, error } = useSWR(
    user ? [artistId, user.token] : null,
    fetcher,
  )

  // Prepare filters
  const [activeFilter, setActiveFilter] = React.useState('all')
  const statusTypes = React.useMemo(() => {
    if (!tournaments) return []
    return tournaments.map(({ status }) => status)
  }, [tournaments])

  // Filter tournaments
  const filteredTournaments = React.useMemo(() => {
    if (!tournaments) return []
    if (activeFilter === 'all') return tournaments
    return tournaments.filter(({ status }) => status === activeFilter)
  }, [tournaments, activeFilter])

  if (!artistId) return <p>No artist ID</p>
  if (!tournaments) return null

  console.log('filteredTournaments', filteredTournaments)

  return (
    <section className="tournaments">
      <h1>Tournaments</h1>
      {/* FILTERS */}
      <TournamentFilters
        statusTypes={statusTypes}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      {/* ALL TOURNAMENTS */}
      <div>
        Visible tournaments: {filteredTournaments.length}
        {filteredTournaments.map((tournament) => {
          return (
            <TournamentOverview
              key={tournament.id}
              tournament={tournament}
            />
          )
        })}
      </div>
    </section>
  )
}

TournamentsLoader.propTypes = {
  artistId: PropTypes.string,
}

TournamentsLoader.defaultProps = {
  artistId: '',
}

export default TournamentsLoader
