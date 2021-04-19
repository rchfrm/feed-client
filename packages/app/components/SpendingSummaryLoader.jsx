// IMPORT PACKAGES
import React from 'react'
import { useAsync } from 'react-async'
import moment from 'moment'
import get from 'lodash/get'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from '@/app/contexts/ArtistContext'
// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'
// IMPORT HELPERS
import * as server from '@/app/helpers/appServer'
import * as utils from '@/helpers/utils'
// IMPORT COPY
import copy from '@/app/copy/InsightPageCopy'
// IMPORT STYLES
import styles from '@/app/Results.module.css'

const calculateSpendOverPeriod = (dailyData, historicalPeriod) => {
  const spend = Object.entries(dailyData).reduce((totalSpend, [date, spend]) => {
    const dateMoment = moment(date, 'YYYY-MM-DD')
    if (dateMoment.isSameOrAfter(historicalPeriod, 'day')) {
      totalSpend += spend
      return totalSpend
    }
    return totalSpend
  }, 0)
  // Return spend formatted
  return Number(spend.toFixed(2))
}

const getArtistTournaments = async (artist) => {
  const tournamentsEndpoint = get(artist, ['_links', 'tournaments', 'href'], '')
  const tournamentsEndpointMod = tournamentsEndpoint ? tournamentsEndpoint.slice(0, tournamentsEndpoint.indexOf('?')) : 0
  const tournaments = tournamentsEndpointMod ? await server.getEndpoint(tournamentsEndpointMod) : []
  return tournaments
}

const getAds = async (tournaments, historicalPeriod) => {
  const adsPaths = tournaments.reduce((acc, tournament) => {
    // If the tournament stopped within the last seven days, get the ads that were in it
    if (moment(tournament.stop_time).isSameOrAfter(historicalPeriod, 'day')) {
      const ads = Object.values(tournament.ads).reduce((acc2, ad) => {
        // Make sure that the ad hasn't already been added from another tournament
        if (acc.indexOf(ad.ad.path) === -1) {
          return [...acc2, ad.ad.path]
        }
        return acc2
      }, [])

      return [...acc, ...ads]
    }
    return acc
  }, [])

  const createAdsPromises = adsPaths.map(async path => {
    return server.getPath(path)
  })

  return Promise.all(createAdsPromises)
}

const calculateImpressions = (ads, historicalPeriod) => {
  return ads.reduce((impressions, { metrics }) => {
    const adImpressions = Object.keys(metrics).reduce((impressions, day) => {
      if (moment(day, 'YYYY-MM-DD').isSameOrAfter(historicalPeriod, 'day')) {
        return impressions + Number(metrics[day].impressions)
      }
      return impressions
    }, 0)
    return impressions + adImpressions
  }, 0)
}

// ASYNC FUNCTION TO FETCH SUMMARY
const fetchSummary = async ({ artist, artistId, daysToInclude }) => {
  if (!artistId) return
  // * GET SPEND
  const { facebook_ad_spend_feed } = await server.getDataSourceValue(['facebook_ad_spend_feed'], artistId) || {}
  // If there the server has no data, return 0
  if (!facebook_ad_spend_feed) return 0
  const historicalPeriod = moment().subtract(daysToInclude, 'days')
  const { daily_data: dailyData } = facebook_ad_spend_feed
  const spend = calculateSpendOverPeriod(dailyData, historicalPeriod)
  if (!spend) return { spend }
  // * GET SUMMARY
  const tournaments = await getArtistTournaments(artist)
  const ads = await getAds(tournaments, historicalPeriod)
  const impressions = calculateImpressions(ads, historicalPeriod)
  // Return result
  return { spend, impressions }
}

function SpendingSummaryLoader() {
  // Get artist ID from context
  const { artist, artistId } = React.useContext(ArtistContext)
  // Define total days to include in summary
  const daysToInclude = 7
  // Run this to fetch summary when the artist changes
  const { data, error, isPending } = useAsync({
    promiseFn: fetchSummary,
    watch: artistId,
    // The variable(s) to pass to promiseFn
    artist,
    artistId,
    daysToInclude,
  })

  if (error) return null

  if (isPending) {
    return (
      <div>
        <Spinner className={styles.summaryLoader} />
      </div>
    )
  }

  const { spend, impressions } = data

  // Stop here if not spend
  if (!spend) return null

  const spendingFormatted = utils.formatCurrency(spend, artist.currency)
  const spendSummary = copy.spendSummary(daysToInclude, spendingFormatted)
  const impressionSummary = copy.impressionSummary(utils.formatNumber(impressions))
  const markdown = `${spendSummary}${impressionSummary}`

  return <MarkdownText className="h4--text" markdown={markdown} />
}

export default SpendingSummaryLoader
