import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import ResultsContent from '@/app/ResultsContent'
import copy from '@/app/copy/ResultsPageCopy'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getAdResultsSummary } from '@/app/helpers/resultsHelpers'

const ResultsLoader = () => {
  const { artistId } = React.useContext(ArtistContext)
  const [adResultsData, setAdResultsData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

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
    <>
      {adResultsData && <ResultsContent data={adResultsData} />}
      {(!adResultsData && !isLoading) && (
        <MarkdownText markdown={copy.noResultsData} />
      )}
    </>
  )
}

ResultsLoader.propTypes = {
}

export default ResultsLoader
