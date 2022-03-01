import React from 'react'

import ResultsLoader from '@/app/ResultsLoader'

import Spinner from '@/elements/Spinner'

import { InterfaceContext } from '@/contexts/InterfaceContext'

const ResultsPage = () => {
  const { globalLoading } = React.useContext(InterfaceContext)

  if (globalLoading) return <Spinner />

  return (
    <ResultsLoader />
  )
}

ResultsPage.propTypes = {
}

export default ResultsPage
