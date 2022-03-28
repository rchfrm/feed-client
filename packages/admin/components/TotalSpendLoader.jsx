import PropTypes from 'prop-types'
import React from 'react'
import { get } from '@/helpers/api'
import Error from '@/elements/Error'

export default function TotalSpendLoader({ artistId }) {
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
      if (!res || !res[0].daily_data) {
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
      <TotalSpend isLoading={isLoading} error={error} spend={data} />
    </>
  )
}

function TotalSpend({ isLoading, error, spend }) {
  if (isLoading) return <p>Loading...</p>
  if (error) return <Error error={error} />
  return <p>{spend.toFixed(2)}</p>
}

TotalSpendLoader.propTypes = {
  artistId: PropTypes.string.isRequired,
}

TotalSpend.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  spend: PropTypes.number,
}

TotalSpend.defaultProps = {
  error: null,
  spend: 0,
}
