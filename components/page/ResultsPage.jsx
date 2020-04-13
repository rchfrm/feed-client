// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
import { UserContext } from '../contexts/User'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
// IMPORT PAGES
import ResultsLoader from '../ResultsLoader'
// IMPORT COPY
import MarkdownText from '../elements/MarkdownText'
import copy from '../../copy/global'

function ResultsPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])

  // Get user context
  const { user } = React.useContext(UserContext)

  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading="results" />

      {user.artists.length === 0 ? (
        <MarkdownText className="ninety-wide  h4--text" markdown={copy.noArtists} />
      ) : (
        <ResultsLoader />
      )}

    </div>
  )
}

export default ResultsPage
