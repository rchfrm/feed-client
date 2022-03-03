import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import ResultsHeader from '@/app/ResultsHeader'
import ResultsContent from '@/app/ResultsContent'
import ResultsNoSpendContent from '@/app/ResultsNoSpendContent'
import NoArtistsConnectAccountsBlock from '@/app/NoArtistsConnectAccountsBlock'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

import { getAdResultsSummary, getOrganicBenchmark, getAggregatedOrganicBenchmark } from '@/app/helpers/resultsHelpers'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsLoader = () => {
  const { user } = React.useContext(UserContext)
  const { artistId, artist: { start_spending_at } } = React.useContext(ArtistContext)

  const hasStartedSpending = Boolean(start_spending_at)
  const hasArtists = user.artists.length

  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  const getResultsType = () => {
    if (!hasArtists) {
      return 'no-profiles'
    }

    if (hasStartedSpending && !isSpendingPaused) {
      return 'paid'
    }

    return 'organic'
  }

  const [aggregatedOrganicData, setAggregatedOrganicData] = React.useState(null)
  const [organicData, setOrganicData] = React.useState(null)
  const [adResultsData, setAdResultsData] = React.useState(null)

  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [resultsType, setResultsType] = React.useState(getResultsType())

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

    if (resultsType === 'no-profiles') {
      handleDataRequest(getAggregatedOrganicBenchmark, aggregatedOrganicData, setAggregatedOrganicData)
      return
    }

    if (resultsType === 'organic') {
      handleDataRequest(getOrganicBenchmark, organicData, setOrganicData)
      return
    }

    handleDataRequest(getAdResultsSummary, adResultsData, setAdResultsData)
  }, [resultsType])

  if (isLoading) return <Spinner />
  if (error) return <Error error={error} />

  return (
    <>
      {resultsType !== 'no-profiles' ? (
        <ResultsHeader
          hasStartedSpending={hasStartedSpending}
          isSpendingPaused={isSpendingPaused}
          dateRange={adResultsData?.dateRange}
          resultsType={resultsType}
          setResultsType={setResultsType}
          setIsLoading={setIsLoading}
        />
      ) : (
        <div className="grid grid-cols-12 col-gap-6 mb-12">
          <NoArtistsConnectAccountsBlock
            page="results"
            className="col-span-12 sm:col-span-6 lg:col-span-4 p-6 bg-grey-1"
          />
        </div>
      )}
      {resultsType === 'no-profiles' && aggregatedOrganicData && <ResultsNoSpendContent data={aggregatedOrganicData} resultsType={resultsType} />}
      {resultsType === 'organic' && organicData && <ResultsNoSpendContent data={organicData} resultsType={resultsType} />}
      {resultsType === 'paid' && <ResultsContent data={adResultsData} isSpendingPaused={isSpendingPaused} />}
    </>
  )
}

ResultsLoader.propTypes = {
}

export default ResultsLoader
