import React from 'react'
import useAsyncEffect from 'use-async-effect'
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'
import ResultsContent from '@/app/ResultsContent'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { getAdBenchmark, getAggregatedAdBenchmark } from '@/app/helpers/resultsHelpers'
import copy from '@/app/copy/ResultsPageCopy'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsLoader = () => {
  const { artistId, artist } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  const [adData, setAdData] = React.useState(null)
  const [aggregatedAdData, setAggregatedAdData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const handleDataRequest = async (getData, data, setData) => {
    if (data) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)

    const { res, error } = await getData(artistId)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setData(res)
  }

  useAsyncEffect(async (isMounted) => {
    if (! isMounted()) {
      return
    }
    setIsLoading(true)

    await Promise.all([
      handleDataRequest(getAdBenchmark, adData, setAdData),
      handleDataRequest(getAggregatedAdBenchmark, aggregatedAdData, setAggregatedAdData),
    ])
  }, [])

  if (! hasSetUpProfile) {
    return <MarkdownText markdown={copy.noResultsData(isSpendingPaused, hasSetUpProfile)} />
  }

  if (isLoading) return <Spinner />

  if (error) return <Error error={error} />

  return (
    <ResultsContent
      adData={adData}
      aggregatedAdData={aggregatedAdData}
      isSpendingPaused={isSpendingPaused}
      hasSetUpProfile={hasSetUpProfile}
    />
  )
}

export default ResultsLoader
