import React from 'react'

import PostsContent from '@/app/PostsContent'

import { ArtistContext } from '@/contexts/ArtistContext'

import useLinksStore from '@/app/hooks/useLinksStore'

const PostsPage = () => {
  // ARTIST context
  const {
    artistId,
    artist,
  } = React.useContext(ArtistContext)

  // SETUP POSTS STORE WHEN ARTIST CHANGES
  const { setupStore, clearAll: clearPostsStore } = useLinksStore()
  React.useEffect(() => {
    setupStore(artist, 'fetchLinks')
  // eslint-disable-next-line
  }, [artistId, setupStore])

  // CLEAR STORE WHEN PAGE UNMOUNT
  React.useEffect(() => {
    return clearPostsStore
  // eslint-disable-next-line
  }, [])

  return <PostsContent />
}

export default PostsPage
