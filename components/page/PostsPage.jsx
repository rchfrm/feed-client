// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import PageHeader from '../PageHeader'
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
import { UserContext } from '../contexts/User'
// IMPORT ELEMENTS
// IMPORT PAGES
import PostsLoader from '../PostsLoader'
// IMPORT COPY
import MarkdownText from '../elements/MarkdownText'
import copy from '../../copy/global'

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

  // Get user context
  const { user } = React.useContext(UserContext)

  return (
    <div className={`page--container ${className}`}>

      {user.artists.length === 0 ? (
        <>
          <PageHeader heading="posts" />
          <MarkdownText className="ninety-wide  h4--text" markdown={copy.noArtists} />
        </>
      ) : (
        <PostsLoader />
      )}

    </div>
  )
}

export default PostsPage
