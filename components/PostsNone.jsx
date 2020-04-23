// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'

import MarkdownText from './elements/MarkdownText'
import copy from '../copy/PostsPageCopy'
// IMPORT STYLES
import styles from './PostsPage.module.css'

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
    <div className={styles.noPosts}>
      <PageHeader heading="your posts" punctuation="," />

      <MarkdownText className={['ninety-wide', 'h4--text', styles.introText].join(' ')} markdown={copy.noPostsCopy(platforms)} />

    </div>
  )
}

export default PostsNone
