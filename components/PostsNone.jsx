// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Feed from './elements/Feed'
import PageHeader from './elements/PageHeader'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

const PostsNone = () => {
// IMPORT CONTEXTS
  const { artist } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  const platforms = (
    artist.facebook_page_url && artist.instagram_url
      ? 'Facebook or Instagram'
      : 'Facebook'
  )

  return (
    <div className="no-posts">
      <PageHeader heading="your posts" punctuation="," />

      <h4>
        It looks like you haven't posted for a little while, and by default
        <Feed />
        {' '}
        only promotes posts from the last month.
      </h4>

      <h4>
        Once you add new posts to
        {platforms}
        , you'll be able to review them here.
      </h4>

    </div>
  )
}

export default PostsNone
