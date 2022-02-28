import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import ResultsHeader from '@/app/ResultsHeader'
import ResultsContent from '@/app/ResultsContent'
import ResultsNoSpendContent from '@/app/ResultsNoSpendContent'
import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getAdResultsSummary, getOrganicBenchmark } from '@/app/helpers/resultsHelpers'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsLoader = () => {
  const { artistId, artist: { start_spending_at } } = React.useContext(ArtistContext)
  const hasStartedSpending = Boolean(start_spending_at)

  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  const [noSpendResultsData, setNoSpendResultsData] = React.useState(null)
  const [adResultsData, setAdResultsData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [resultsType, setResultsType] = React.useState((hasStartedSpending && !isSpendingPaused) ? 'paid' : 'organic')

  const handleDataRequest = async (getData, data, setData) => {
    if (data) {
      setIsLoading(false)
      return
    }

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
    if (!isMounted()) return
    setIsLoading(true)

    if (resultsType === 'organic') {
      handleDataRequest(getOrganicBenchmark, noSpendResultsData, setNoSpendResultsData)
    } else {
      handleDataRequest(getAdResultsSummary, adResultsData, setAdResultsData)
    }
  }, [resultsType])

  if (isLoading) return <Spinner />
  if (error) return <Error error={error} />

  return (
    <>
      <ResultsHeader
        hasStartedSpending={hasStartedSpending}
        isSpendingPaused={isSpendingPaused}
        dateRange={adResultsData?.dateRange}
        resultsType={resultsType}
        setResultsType={setResultsType}
        setIsLoading={setIsLoading}
      />
      {resultsType === 'organic' && noSpendResultsData && <ResultsNoSpendContent data={noSpendResultsData} />}
      {resultsType === 'paid' && <ResultsContent data={adResultsData} isSpendingPaused={isSpendingPaused} />}
    </>
  )
}

ResultsLoader.propTypes = {
}

export default ResultsLoader
