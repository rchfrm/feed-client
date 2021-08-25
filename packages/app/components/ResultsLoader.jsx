import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import ResultsContent from '@/app/ResultsContent'

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
  if (error) <Error />

  return (
    adResultsData && <ResultsContent data={adResultsData} />
  )
}

ResultsLoader.propTypes = {
}

export default ResultsLoader
