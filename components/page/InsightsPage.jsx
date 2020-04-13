// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
import { UserContext } from '../contexts/User'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
// IMPORT PAGES
import InsightsLoader from '../InsightsLoader'
// IMPORT ASSETS
import MarkdownText from '../elements/MarkdownText'
import copy from '../../copy/InsightPageCopy'
// IMPORT HELPERS

function InsightsPage() {
  // SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])

  return (
    <div className={`${className}`}>

      <PageHeader heading="Insights" />
      <InsightsLoader />

    </div>
  )
}

export default InsightsPage
