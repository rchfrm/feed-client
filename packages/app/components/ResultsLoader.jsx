import React from 'react'
import PropTypes from 'prop-types'
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

import { getAdBenchmark, getAggregatedAdBenchmark, getOrganicBenchmark, getAggregatedOrganicBenchmark } from '@/app/helpers/resultsHelpers'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsLoader = ({ dummyPostsImages }) => {
  const { user } = React.useContext(UserContext)
  const { artistId, artist: { start_spending_at } } = React.useContext(ArtistContext)

  const hasStartedSpending = Boolean(start_spending_at)
  const hasNoProfiles = !user.artists.length

  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  const getResultsType = () => {
    if (hasNoProfiles) {
      return 'no-profiles'
    }

    if (hasStartedSpending && !isSpendingPaused) {
      return 'paid'
    }

    return 'organic'
  }

  const [organicData, setOrganicData] = React.useState(null)
  const [aggregatedOrganicData, setAggregatedOrganicData] = React.useState(null)
  const [adData, setAdData] = React.useState(null)
  const [aggregatedAdData, setAggregatedAdData] = React.useState(null)

  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [resultsType, setResultsType] = React.useState(getResultsType())

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
    if (!isMounted()) return
    setIsLoading(true)

    if (resultsType !== 'paid') {
      await handleDataRequest(getAggregatedOrganicBenchmark, aggregatedOrganicData, setAggregatedOrganicData)

      if (resultsType === 'organic') {
        await handleDataRequest(getOrganicBenchmark, organicData, setOrganicData)
      }
      return
    }

    await Promise.all([
      handleDataRequest(getAdBenchmark, adData, setAdData),
      handleDataRequest(getAggregatedAdBenchmark, aggregatedAdData, setAggregatedAdData),
    ])
  }, [resultsType])

  if (isLoading) return <Spinner />
  if (error) return <Error error={error} />

  return (
    <>
      {!hasNoProfiles ? (
        <ResultsHeader
          hasStartedSpending={hasStartedSpending}
          dateRange={adData?.dateRange}
          resultsType={resultsType}
          setResultsType={setResultsType}
          setIsLoading={setIsLoading}
        />
      ) : (
        <div className="grid grid-cols-12 gap-x-6 mb-12">
          <NoArtistsConnectAccountsBlock
            page="results"
            className="col-span-12 sm:col-span-6 lg:col-span-4 p-6 bg-grey-1"
          />
        </div>
      )}
      {((hasNoProfiles && aggregatedOrganicData) || (resultsType === 'organic' && organicData)) && (
        <ResultsNoSpendContent
          organicData={organicData}
          aggregatedOrganicData={aggregatedOrganicData}
          hasNoProfiles={hasNoProfiles}
          dummyPostsImages={dummyPostsImages}
        />
      )}
      {resultsType === 'paid' && adData && aggregatedAdData && (
        <ResultsContent
          adData={adData}
          aggregatedAdData={aggregatedAdData}
          isSpendingPaused={isSpendingPaused}
        />
      )}
    </>
  )
}

ResultsLoader.propTypes = {
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

export default ResultsLoader
