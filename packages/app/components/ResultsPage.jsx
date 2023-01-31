import React from 'react'
import PropTypes from 'prop-types'

import ResultsLoader from '@/app/ResultsLoader'

import Spinner from '@/elements/Spinner'

import { InterfaceContext } from '@/app/contexts/InterfaceContext'

const ResultsPage = ({ dummyPostsImages }) => {
  const { globalLoading } = React.useContext(InterfaceContext)

  if (globalLoading) return <Spinner />

  return (
    <ResultsLoader dummyPostsImages={dummyPostsImages} />
  )
}

ResultsPage.propTypes = {
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

export default ResultsPage
