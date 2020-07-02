import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import Error from '@/elements/Error'
import TournamentFilters from '@/admin/TournamentFilters'
import TournamentOverview from '@/admin/TournamentOverview'

import { UserContext } from '@/contexts/UserContext'

import * as server from '@/admin/helpers/adminServer'

const fetcher = async (artistId, campaignId, adsetId, tournamentId) => {
  if (!artistId) return []
  // Get all artist tournaments
  if (!tournamentId) {
    return server.getArtistTournaments(artistId, tournamentId)
  }
  // Get single tournament
  const tournament = await server.getTournament(artistId, campaignId, adsetId, tournamentId)
  return [tournament]
}

const TournamentsLoader = ({ artistId, campaignId, adsetId, tournamentId }) => {
  const { user } = React.useContext(UserContext)
  const { data: tournaments, error } = useSWR(
    user ? [artistId, campaignId, adsetId, tournamentId] : null,
    fetcher,
  )

  // Define loader type
  const singleTournament = React.useMemo(() => {
    return !!tournamentId
  }, [tournamentId])

  // Prepare filters
  const [activeFilter, setActiveFilter] = React.useState('all')
  const statusTypes = React.useMemo(() => {
    if (!tournaments || singleTournament) return []
    return tournaments.map(({ status }) => status)
  }, [tournaments, singleTournament])

  // Filter tournaments
  const filteredTournaments = React.useMemo(() => {
    if (!tournaments) return []
    if (activeFilter === 'all') return tournaments
    return tournaments.filter(({ status }) => status === activeFilter)
  }, [tournaments, activeFilter])

  // Stop here if no tournaments
  if (tournaments && !tournaments.length) {
    return (
      <p>No Tournaments found</p>
    )
  }

  if (error) return <Error error={error} />

  return (
    <section className="tournaments">
      <h1>{singleTournament ? 'Tournament' : 'Tournaments'}</h1>
      {/* FILTERS */}
      {!!statusTypes.length && (
        <TournamentFilters
          statusTypes={statusTypes}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      )}
      {/* ALL TOURNAMENTS */}
      <div>
        {!singleTournament && (
          <p>Visible tournaments: {filteredTournaments.length}</p>
        )}
        <div className="grid grid-cols-12 sm:col-gap-4 row-gap-10 pt-5">
          {filteredTournaments.map((tournament) => {
            return (
              <TournamentOverview
                key={tournament.id}
                tournament={tournament}
                artistId={artistId}
                listView={!singleTournament}
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
  artistId: PropTypes.string.isRequired,
  campaignId: PropTypes.string,
  adsetId: PropTypes.string,
  tournamentId: PropTypes.string,
}

TournamentsLoader.defaultProps = {
  campaignId: '',
  adsetId: '',
  tournamentId: '',
}

export default TournamentsLoader
