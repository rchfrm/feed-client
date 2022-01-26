import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import ResultsHeader from '@/app/ResultsHeader'
import ResultsContent from '@/app/ResultsContent'
import ResultsNoSpendContent from '@/app/ResultsNoSpendContent'
import copy from '@/app/copy/ResultsPageCopy'
import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getAdResultsSummary, getOrganicBenchmark } from '@/app/helpers/resultsHelpers'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsLoader = () => {
  const { artistId } = React.useContext(ArtistContext)
  const [noSpendResultsData, setNoSpendResultsData] = React.useState(null)
  const [adResultsData, setAdResultsData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [resultsType, setResultsType] = React.useState('organic')

  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  const resultsData = noSpendResultsData || adResultsData

  const handleDataRequest = async (getData, data, setData) => {
    if (data) {
      setIsLoading(false)
      return
    }

    const res = await getData(artistId)

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
    resultsData ? (
      <>
        <ResultsHeader
          data={resultsData}
          resultsType={resultsType}
          setResultsType={setResultsType}
          setIsLoading={setIsLoading}
        />
        {resultsType === 'organic' && noSpendResultsData && <ResultsNoSpendContent data={noSpendResultsData} />}
        {resultsType === 'paid' && adResultsData && <ResultsContent data={adResultsData} />}
      </>
    ) : (
      <>
        {!isLoading && (
          <MarkdownText markdown={copy.noResultsData(isSpendingPaused)} />
        )}
      </>
    )
  )
}

ResultsLoader.propTypes = {
}

export default ResultsLoader
