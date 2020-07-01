import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import TournamentFilters from '@/admin/TournamentFilters'
import TournamentOverview from '@/admin/TournamentOverview'

import { UserContext } from '@/contexts/UserContext'

import * as server from '@/admin/helpers/adminServer'

const fetcher = (artistId) => {
  if (!artistId) return []
  return server.getArtistTournaments(artistId)
}

const TournamentsLoader = ({ artistId }) => {
  const { user } = React.useContext(UserContext)
  const { data: tournaments, error } = useSWR(
    user ? [artistId] : null,
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
  if (error) {
    console.log('error', error)
  }

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
        <p>Visible tournaments: {filteredTournaments.length}</p>
        <div className="grid grid-cols-12 gap-4 pt-5">
          {filteredTournaments.map((tournament) => {
            return (
              <TournamentOverview
                key={tournament.id}
                tournament={tournament}
                listView
                className={[
                  'col-span-12',
                  'sm:col-span-6',
                ].join(' ')}
              />
            )
          })}
        </div>
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
