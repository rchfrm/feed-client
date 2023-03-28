import React from 'react'
import Spinner from '@/elements/Spinner'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'

const ResultsPage = () => {
  const { globalLoading } = React.useContext(InterfaceContext)

  if (globalLoading) {
    return <Spinner />
  }

  return (
    <p>Results...</p>
  )
}

export default ResultsPage
