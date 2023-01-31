import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import Error from '@/elements/Error'
import SectionHeader from '@/admin/elements/SectionHeader'
import TournamentFilters from '@/admin/TournamentFilters'
import TournamentList from '@/admin/TournamentList'
import TournamentNavigation from '@/admin/TournamentNavigation'

import { UserContext } from '@/admin/contexts/UserContext'
import { InterfaceContext } from '@/admin/contexts/InterfaceContext'

import * as server from '@/helpers/sharedServer'

const fetcher = async (artistId, campaignId, adsetId, tournamentId) => {
  if (! artistId) return []
  // Get single tournament
  if (tournamentId) {
    // Get tournament
    const tournament = await server.getTournament(artistId, campaignId, adsetId, tournamentId)
    // Get campaign and adset
    const campaign = await server.getCampaign(artistId, campaignId)
    const { name: campaign_name, platform } = campaign
    const adset = await server.getAdset(artistId, campaignId, adsetId)
    const { name: adset_name, budget_remaining, daily_budget } = adset
    // Add data from campaign and adset into tournament
    const tournamentComplete = {
      ...tournament,
      campaign_name,
      platform,
      adset_name,
      daily_budget,
      budget_remaining,
    }
    return [tournamentComplete]
  }
  // Get all artist tournaments
  return server.getArtistTournaments({ artistId })
}

const TournamentsLoader = ({ artistId, campaignId, adsetId, tournamentId }) => {
  const { user } = React.useContext(UserContext)
  const { data: tournaments, error } = useSWR(
    user ? [artistId, campaignId, adsetId, tournamentId] : null,
    fetcher,
  )

  // Define loader type
  const singleTournament = React.useMemo(() => {
    return !! tournamentId
  }, [tournamentId])

  // Prepare filters
  const [activeFilter, setActiveFilter] = React.useState('all')
  const statusTypes = React.useMemo(() => {
    if (! tournaments || singleTournament) return []
    return tournaments.map(({ status }) => status)
  }, [tournaments, singleTournament])

  // Filter tournaments (based on active filter), &&
  const filteredTournaments = React.useMemo(() => {
    // Stop if no data
    if (! tournaments) return []
    // If only one tournament, or showing all tournaments
    if (tournaments.length === 1 || activeFilter === 'all') return tournaments
    // Filter tournaments (if neededd)
    return tournaments.filter(({ status }) => status === activeFilter)
  }, [tournaments, activeFilter])

  // Group tournaments by ad sets
  const groupedTournaments = React.useMemo(() => {
    if (singleTournament) return filteredTournaments
    return filteredTournaments.reduce((adsets, tournament) => {
      const { adset_id: tournamentAdsetId } = tournament
      // If adset group already exists,
      // add tournament to array
      const adsetGroup = adsets[tournamentAdsetId]
      if (adsetGroup) {
        const updatedAdsetGroup = [...adsetGroup, tournament]
        adsets[tournamentAdsetId] = updatedAdsetGroup
        return adsets
      }
      // Else start adset group
      adsets[tournamentAdsetId] = [tournament]
      return adsets
    }, {})
  }, [singleTournament, filteredTournaments])

  // Turn off global loading when finished
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    const loading = ! tournaments && ! error
    toggleGlobalLoading(loading)
  }, [tournaments, toggleGlobalLoading, error])

  // Stop here before data is ready
  if (! tournaments) return null

  // Stop here if no tournaments
  if (tournaments && ! tournaments.length) {
    return (
      <p>No Tournaments found</p>
    )
  }

  if (error) return <Error error={error} />

  return (
    <section className="tournaments">
      <h1>{singleTournament ? 'Tournament' : 'Tournaments'}</h1>
      {/* FILTERS */}
      {!! statusTypes.length && (
        <TournamentFilters
          statusTypes={statusTypes}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      )}
      {/* ALL TOURNAMENTS */}
      <div>
        {! singleTournament && (
          <p>Visible tournaments: {filteredTournaments.length}</p>
        )}
        {/* If showing a single tournament, just show it */}
        {singleTournament ? (
          <TournamentList
            tournaments={filteredTournaments}
            artistId={artistId}
            singleTournament={singleTournament}
          />
        ) : (
          // {/* Else group tournaments by adset */}
          Object.entries(groupedTournaments).map(([adsetId, tournaments]) => {
            return (
              <div key={adsetId} className="mt-8">
                <SectionHeader header={`Adset: ${adsetId}`} />
                <TournamentList
                  tournaments={tournaments}
                  artistId={artistId}
                />
              </div>
            )
          })
        )}
      </div>
      {/* TOURNAMENT NAV */}
      {singleTournament && (
        <TournamentNavigation
          artistId={artistId}
          nextTournament={tournaments[0].next}
          previousTournament={tournaments[0].previous}
        />
      )}
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
