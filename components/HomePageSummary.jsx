// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
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

function SummaryLoader() {
// REDEFINE PROPS AS VARIABLES
  const { getToken } = React.useContext(AuthContext)
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
    // Get token from the auth context
    const token = await getToken()
    // Get daily data for the 'facebook_ad_spend_feed' data source
    const feedAdSpend = await server.getDataSourceValue(['facebook_ad_spend_feed'], artistId, token)
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
  }, [getToken])

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

export default SummaryLoader

function Summary(props) {
// REDEFINE PROPS AS VARIABLES
  const { artistId } = props
  const { spend } = props
  // END REDEFINE PROPS AS VARIABLES

  // GET TOKEN
  const { getToken } = React.useContext(AuthContext)
  // END GET TOKEN

  // DEFINE STATES
  const [impressions, setImpressions] = React.useState(undefined)
  const [loading, setLoading] = React.useState(false)
  // END DEFINE STATES

  const calculateImpressions = React.useCallback(async artistId => {
    // Get token from auth context and retrieve active and archived posts from the server
    const token = await getToken()
    const activeAssets = await server.getAssets(artistId, 'active', token)
    const archivedAssets = await server.getAssets(artistId, 'archived', token)
    // Combine the two objects returned by the server into one
    const assets = {
      ...activeAssets,
      ...archivedAssets,
    }

    let totalImpressions = 0
    const sevenDaysAgo = moment().subtract(7, 'days')

    // Go through each asset, and each ad to add up the total number
    // of impressions from last seven days
    Object.values(assets).forEach(asset => {
      const ads = Object.values(asset.ads)
      ads.forEach(ad => {
        const dates = Object.keys(ad.metrics)
        if (dates.length > 0) {
          dates.forEach(date => {
            const dateMoment = moment(date, 'YYYY-MM-DD')
            if (dateMoment.isSameOrAfter(sevenDaysAgo, 'day')) {
              totalImpressions += Number(ad.metrics[date].impressions)
            }
          })
        }
      })
    })

    return totalImpressions
  }, [getToken])

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
    <h3 className="ninety-wide">
      In the last 7 days, you&apos;ve
      {' '}
      <span className="strong">
        spent £
        {spend}
      </span>
      {loading
        ? <Ellipsis />
        : <Impressions impressions={impressions} />}
    </h3>
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
