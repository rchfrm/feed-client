// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
// IMPORT PAGES
import PageHeader from '../PageHeader'
import PostsLoader from '../PostsLoader'

import MarkdownText from '../elements/MarkdownText'
import copy from '../../copy/PostsPageCopy'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

// TODO: Create promotion_enabled checkbox loading state
// TODO: Split out loading states so that, non-dynamic parts of the page display straight away
// TODO: Click on image to pop up uncropped larger version
// TODO: Show more of truncated text on post
// TODO: Remove up / down arrows from number input on Firefox (and others?)
// TODO: Create reminders for user to review daily budget

function PostsPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading="review your posts" punctuation="," />

      <MarkdownText className="ninety-wide  h4--text" markdown={copy.intro} />

      <PostsLoader />

    </div>
  )
}

export default PostsPage
