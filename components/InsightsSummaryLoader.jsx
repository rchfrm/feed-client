// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
import get from 'lodash/get'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Ellipsis from './elements/Ellipsis'
import Loading from './elements/Loading'
import Nothing from './elements/Nothing'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import server from './helpers/server'
import helper from './helpers/helper'
// IMPORT STYLES

function InsightsSummaryLoader() {
// REDEFINE PROPS AS VARIABLES
  const { artist } = React.useContext(ArtistContext)
  // END REDEFINE PROPS AS VARIABLES

  // DEFINE LOADING STATE
  const [loading, setLoading] = React.useState(true)
  // END DEFINE LOADING STATE

  // DEFINE SEVEN DAY SPENDING TOTAL
  const [spend, setSpend] = React.useState(null)
  // END DEFINE SEVEN DAY SPENDING TOTAL

  // RESET EVERYTHING IF THE SELECTED ARTIST CHANGES
  React.useEffect(() => {
    setLoading(true)
    setSpend(null)
  }, [artist.id])
  // END RESET EVERYTHING IF THE SELECTED ARTIST CHANGES

  // CALCULATE NUMBER OF IMPRESSIONS IN LAST SEVEN DAYS
  const getAdSpend = React.useCallback(async artistId => {
    // Get daily data for the 'facebook_ad_spend_feed' data source
    const feedAdSpend = await server.getDataSourceValue(['facebook_ad_spend_feed'], artistId)
    // If there the server has no data, return 0
    if (!feedAdSpend.facebook_ad_spend_feed) { return 0 }

    // Cycle through the daily data, and add up the values of all
    // dates that fall within the last seven days
    const dailyData = feedAdSpend.facebook_ad_spend_feed.daily_data
    const sevenDaysAgo = moment().subtract('7', 'days')
    let spend = 0
    const dates = Object.keys(dailyData)
    dates.forEach(date => {
      const dateMoment = moment(date, 'YYYY-MM-DD')
      if (dateMoment.isSameOrAfter(sevenDaysAgo, 'day')) {
        spend += dailyData[date]
      }
    })
    return Number(spend.toFixed(2))
  }, [])

  React.useEffect(() => {
    if (artist.id && loading) {
      getAdSpend(artist.id)
        .then(adSpend => {
          setSpend(adSpend)
          setLoading(false)
        })
    }
  }, [artist.id, getAdSpend, loading])
  // END CALCULATE NUMBER OF IMPRESSIONS IN LAST SEVEN DAYS

  if (loading) {
    return <Loading />
  }
  return <Summary spend={spend} artistId={artist.id} />
}

export default InsightsSummaryLoader

function Summary(props) {
  const { artistId, spend } = props
  const { artist } = React.useContext(ArtistContext)
  const [impressions, setImpressions] = React.useState(undefined)
  const [loading, setLoading] = React.useState(false)

  const calculateImpressions = React.useCallback(async () => {
    const tournamentsEndpoint = get(artist, ['_links', 'tournaments', 'href'], '')
    const tournamentsEndpointMod = tournamentsEndpoint ? tournamentsEndpoint.slice(0, tournamentsEndpoint.indexOf('?')) : 0
    const tournaments = tournamentsEndpointMod ? await server.getEndpoint(tournamentsEndpointMod) : []
    const sevenDaysAgo = moment().subtract(7, 'days')

    const createAdsPaths = tournaments.reduce((acc, tournament) => {
      // If the tournament stopped within the last seven days, get the ads that were in it
      if (moment(tournament.stop_time).isSameOrAfter(sevenDaysAgo, 'day')) {
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

    const createAdsPromises = createAdsPaths.map(async path => {
      return server.getPath(path)
    })

    const ads = await Promise.all(createAdsPromises)
      .catch(err => {
        throw (err)
      })

    return ads.reduce((impressions, { metrics }) => {
      const adImpressions = Object.keys(metrics).reduce((impressions, day) => {
        if (moment(day, 'YYYY-MM-DD').isSameOrAfter(sevenDaysAgo, 'day')) {
          return impressions + Number(metrics[day].impressions)
        }
        return impressions
      }, 0)
      return impressions + adImpressions
    }, 0)
  }, [])

  React.useEffect(() => {
    // Exit if the request to get assets from the server has already started
    if (loading) {
      return
    }

    // Exit if impressions is greater than or equal to 0
    if (impressions >= 0) {
      return
    }

    setLoading(true)
    calculateImpressions(artistId)
      .then(sevenDayImpressions => {
        setImpressions(sevenDayImpressions)
        setLoading(false)
      })
  }, [artistId, calculateImpressions, impressions, spend, loading])

  if (spend === 0) {
    return <Nothing />
  }
  return (
    <div className="ninety-wide  h4--text">
      <p>
        In the last 7 days, you've
        {' '}
        <span className="strong">
          spent £
          {spend}
        </span>
        {loading
          ? <Ellipsis />
          : <Impressions impressions={impressions} />}
      </p>
    </div>
  )
}

function Impressions(props) {
  const { impressions } = props

  const prefix = ', and your posts were seen'

  if (impressions === 0) {
    return <span>.</span>
  } if (impressions === 1) {
    return (
      <span>
        {prefix}
        {' '}
        <span className="strong">once</span>
      </span>
    )
  }
  return (
    <span>
      {prefix}
      {' '}
      <span className="strong">{helper.formatNumber(impressions)}</span>
      {' '}
      times.
    </span>
  )
}
