import React from 'react'

import PostsContent from '@/app/PostsContent'

import { ArtistContext } from '@/contexts/ArtistContext'

import linksStore from '@/app/store/linksStore'

const PostsPage = () => {
  // ARTIST context
  const {
    artistId,
    artist,
  } = React.useContext(ArtistContext)

  // SETUP POSTS STORE WHEN ARTIST CHANGES
  const setupLinksStore = linksStore(state => state.init)
  const clearLinkStore = linksStore(state => state.clearAll)
  React.useEffect(() => {
    setupLinksStore(artist, 'fetchLinks')
  // eslint-disable-next-line
  }, [artistId, setupLinksStore])

  // UPDATE INTEGRATIONS when they change on artist
  React.useEffect(() => {
    setupLinksStore(artist, 'fetchLinks')
  // eslint-disable-next-line
  }, [artist.integrations, setupLinksStore])

  // CLEAR STORE WHEN PAGE UNMOUNT
  React.useEffect(() => {
    return clearLinkStore
  // eslint-disable-next-line
  }, [clearLinkStore])

  return <PostsContent />
}

export default PostsPage
