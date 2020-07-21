import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import TournamentsItem from '@/app/TournamentsItem'
import Error from '@/elements/Error'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import * as server from '@/helpers/sharedServer'
import * as tournamentHelpers from '@/helpers/tournamentHelpers'

const fetcher = async (artistId, campaignId, adsetId, tournamentId) => {
  if (!artistId) return []
  // GET SINGLE TOURNAMENT
  if (tournamentId) {
    // Get tournament
    const tournament = await server.getTournament(artistId)
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
  // GET ALL ARTIST TOURNAMENTS
  return server.getArtistTournaments(artistId, true)
}

const TournamentsLoader = ({ audienceId }) => {
  const { artistId, artistCurrency } = React.useContext(ArtistContext)
  const { data: tournaments, error } = useSWR(
    [artistId],
    fetcher,
  )

  // Turn off global loading when finished
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    const loading = !tournaments && !error
    toggleGlobalLoading(loading)
  }, [tournaments, toggleGlobalLoading, error])

  // FILTERED TOURNAMENTS
  const tournamentsFiltered = React.useMemo(() => {
    if (!tournaments) return []
    return tournamentHelpers.filterTournaments(tournaments, audienceId)
  }, [tournaments, audienceId])

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
      {tournamentsFiltered.map((tournament) => {
        return (
          <TournamentsItem
            key={tournament.id}
            tournamentProps={tournament}
            artistCurrency={artistCurrency}
            className="mb-24"
          />
        )
      })}
    </section>
  )
}

TournamentsLoader.propTypes = {
  audienceId: PropTypes.string.isRequired,
}

TournamentsLoader.defaultProps = {

}

export default TournamentsLoader
