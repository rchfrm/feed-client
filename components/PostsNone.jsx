// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/Artist'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/copy/PostsPageCopy'
// IMPORT STYLES
import styles from '@/PostsPage.module.css'

const PostsNone = () => {
  // IMPORT CONTEXTS
  const { artist } = React.useContext(ArtistContext)
  const { setHeader } = React.useContext(InterfaceContext)

  const platforms = (
    artist.facebook_page_url && artist.instagram_url
      ? 'Facebook or Instagram'
      : 'Facebook'
  )

  // Update header
  React.useEffect(() => {
    setHeader({ text: 'your posts', punctuation: ',' })
  }, [setHeader])

  return (
    <div className={styles.noPosts}>
      <MarkdownText className={['h4--text', styles.introText].join(' ')} markdown={copy.noPostsCopy(platforms)} />
    </div>
  )
}

export default PostsNone
