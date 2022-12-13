import PropTypes from 'prop-types'
import React from 'react'
import TotalSpend from '@/admin/TotalSpend'
import useAsyncEffect from 'use-async-effect'
import { getArtistDataSource } from '@/admin/helpers/adminServer'

export default function TotalSpendLoader({ artistId, artistCurrency }) {
  const [dataRequested, setDataRequested] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [data, setData] = React.useState(undefined)
  const [error, setError] = React.useState()

  useAsyncEffect(async () => {
    if (! artistId) {
      setIsLoading(false)
      return
    }
    if (dataRequested) {
      setIsLoading(false)
      return
    }
    setDataRequested(true)
    setIsLoading(true)
    const { res, error } = await getArtistDataSource(artistId, 'facebook_ad_spend_feed')
    if (error) {
      setIsLoading(false)
      setError(error)
      return
    }
    if (! res || ! res[0] || ! res[0].daily_data) {
      setData(0)
      setIsLoading(false)
      return
    }
    const dailyData = res[0].daily_data
    const spend = Object.values(dailyData).reduce((acc, cur) => acc + cur, 0)
    setData(spend)
    setIsLoading(false)
  })

  return (
    <>
      <h4><strong>Total Spend</strong></h4>
      <TotalSpend
        isLoading={isLoading}
        error={error}
        spend={data}
        currency={artistCurrency}
      />
    </>
  )
}

TotalSpendLoader.propTypes = {
  artistId: PropTypes.string.isRequired,
  artistCurrency: PropTypes.string,
}

TotalSpendLoader.defaultProps = {
  artistCurrency: 'GBP',
}
