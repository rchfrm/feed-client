import React from 'react'
import PropTypes from 'prop-types'

import useSWR from 'swr'

import TournamentsItemAd from '@/app/TournamentsItemAd'
import TournamentsItemData from '@/app/TournamentsItemData'
import Error from '@/elements/Error'

import * as server from '@/helpers/sharedServer'
import * as tournamentHelpers from '@/helpers/tournamentHelpers'

import styles from '@/app/Tournaments.module.css'

const fetcher = (artistId, campaignId, adsetId, tournamentId) => {
  return server.getTournament(artistId, campaignId, adsetId, tournamentId, true)
}

const TournamentsItem = ({ tournamentProps, artistCurrency, className }) => {
  const { artist_id, campaign_id, adset_id, id: tournament_id } = tournamentProps
  // LOAD TOURNAMENT
  const { data: tournamentRaw, error } = useSWR(
    [artist_id, campaign_id, adset_id, tournament_id],
    fetcher,
  )
  // Format data
  const tournament = React.useMemo(() => {
    if (!tournamentRaw) return null
    return tournamentHelpers.formatTournamentData(tournamentRaw, artistCurrency)
  }, [tournamentRaw, artistCurrency])
  // Count Ads
  const totalAds = tournament ? tournament.adPosts.length : 0
  // Is ad a pair?
  const isAdPair = !!(totalAds > 1)

  console.log('tournament', tournament)

  if (error) return <Error error={error} />
  if (!tournament) return null

  return (
    <div
      className={[
        'sm:grid sm:grid-cols-12 sm:col-gap-8',
        styles.tournamentItem,
        className,
      ].join(' ')}
    >
      {/* TOP BAR */}
      <header
        className={[
          'flex justify-between',
          'col-span-12',
          'mb-10',
          'sm:mb-5',
          'pb-2 xxs:pb-3',
          styles.topBar,
        ].join(' ')}
      >
        <p className="date">
          <span>{tournament.dateCreated}</span>
          <span> at </span>
          <span>{tournament.timeCreated}</span>
        </p>
        <p className="capitalize">{tournament.status}</p>
      </header>
      {/* ADS */}
      <div className="sm:col-span-5 sm:mt-3">
        {/* FIRST AD */}
        <TournamentsItemAd title="Ad A" adPost={tournament.adPosts[0]} winner={isAdPair} />
        {/* SECOND AD */}
        {isAdPair && (
          <TournamentsItemAd title="Ad B" adPost={tournament.adPosts[1]} secondary />
        )}
      </div>
      {/* DATA */}
      <TournamentsItemData
        className="w-full sm:col-span-7"
        dataA={tournament.adPosts[0].data}
        dataB={tournament.adPosts[1] && tournament.adPosts[1].data}
      />
    </div>
  )
}

TournamentsItem.propTypes = {
  tournamentProps: PropTypes.object.isRequired,
  artistCurrency: PropTypes.string,
  className: PropTypes.string,
}

TournamentsItem.defaultProps = {
  artistCurrency: '',
  className: '',
}


export default TournamentsItem
