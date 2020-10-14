import React from 'react'

import PostsContent from '@/app/PostsContent'

import { PostsContextProvider } from '@/app/contexts/PostsContext'
import { ArtistContext } from '@/contexts/ArtistContext'

import usePostsStore from '@/app/hooks/usePostsStore'

const PostsPage = () => {
  // ARTIST context
  const {
    artistId,
    artist,
  } = React.useContext(ArtistContext)
  // Setup posts store when artist changes
  const { setupStore } = usePostsStore()
  React.useEffect(() => {
    setupStore(artist)
  // eslint-disable-next-line
  }, [artistId, setupStore])
  return (
    <PostsContextProvider>
      <PostsContent />
    </PostsContextProvider>
  )
}

export default PostsPage
