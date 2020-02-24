// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
// IMPORT PAGES
import ResultsLoader from '../ResultsLoader'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

function ResultsPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  return (
    <div className={`page-container ${className}`}>

      <PageHeader heading="results" />

      <ResultsLoader />

    </div>
  )
}

export default ResultsPage
