import PropTypes from 'prop-types'
import React from 'react'
import { get } from '@/helpers/api'
import TotalSpend from '@/admin/TotalSpend'

export default function TotalSpendLoader({ artistId, artistCurrency }) {
  const [dataRequested, setDataRequested] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [data, setData] = React.useState(0)
  const [error, setError] = React.useState()

  React.useEffect(() => {
    if (dataRequested) return
    async function getData() {
      setDataRequested(true)
      setIsLoading(true)
      const res = await get(`artists/${artistId}/data_sources?name=facebook_ad_spend_feed`)
      if (!res || !res[0] || !res[0].daily_data) {
        setData(0)
        setIsLoading(false)
      }
      const dailyData = res[0].daily_data
      const spend = Object.values(dailyData).reduce((acc, cur) => acc + cur, 0)
      setData(spend)
      setIsLoading(false)
    }
    getData()
      .catch(err => {
        setError(err)
        setIsLoading(false)
      })
  }, [artistId, dataRequested])

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
