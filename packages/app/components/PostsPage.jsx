import React from 'react'

import PostsContent from '@/app/PostsContent'

import { ArtistContext } from '@/contexts/ArtistContext'

import useLinksStore from '@/app/hooks/useLinksStore'
import linksStore from '@/app/store/linksStore'

const PostsPage = () => {
  // ARTIST context
  const {
    artistId,
    artist,
  } = React.useContext(ArtistContext)

  // SETUP POSTS STORE WHEN ARTIST CHANGES
  const { setupStore, clearAll: clearPostsStore } = useLinksStore()
  const updateIntegrations = linksStore(state => state.updateIntegrations)
  React.useEffect(() => {
    setupStore(artist, 'fetchLinks')
  // eslint-disable-next-line
  }, [artistId, setupStore])

  // UPDATE INTEGRATIONS when they change on artist
  React.useEffect(() => {
    updateIntegrations(artist)
  // eslint-disable-next-line
  }, [artist.integrations])

  // CLEAR STORE WHEN PAGE UNMOUNT
  React.useEffect(() => {
    return clearPostsStore
  // eslint-disable-next-line
  }, [])

  return <PostsContent />
}

export default PostsPage
