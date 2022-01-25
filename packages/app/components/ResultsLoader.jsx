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

import { getAdResultsSummary } from '@/app/helpers/resultsHelpers'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsLoader = () => {
  const { artistId } = React.useContext(ArtistContext)
  const [adResultsData, setAdResultsData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [resultsType, setResultsType] = React.useState('organic')

  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  useAsyncEffect(async (isMounted) => {
    setIsLoading(true)
    const res = await getAdResultsSummary(artistId)
    if (!isMounted()) return
    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }
    setAdResultsData(res)
    setIsLoading(false)
  }, [])

  if (isLoading) <Spinner />
  if (error) <Error error={error} />

  return (
    adResultsData ? (
      <>
        <ResultsHeader
          data={adResultsData}
          resultsType={resultsType}
          setResultsType={setResultsType}
        />
        {resultsType === 'paid' && <ResultsContent data={adResultsData} />}
        {resultsType === 'organic' && <ResultsNoSpendContent />}
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
