import React from 'react'

import PostsContent from '@/app/PostsContent'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useLinksStore from '@/app/stores/linksStore'

const linksStoreInit = state => state.initLinkStore
const getUpdateLinksWithIntegrations = state => state.updateLinksWithIntegrations
const linksStoreClearAll = state => state.clearAll

const PostsPage = () => {
  // ARTIST context
  const {
    artistId,
    artist,
  } = React.useContext(ArtistContext)

  // SETUP POSTS STORE WHEN ARTIST CHANGES
  const setupLinksStore = useLinksStore(linksStoreInit)
  const clearLinkStore = useLinksStore(linksStoreClearAll)
  React.useEffect(() => {
    if (!artistId) return
    clearLinkStore()
    setupLinksStore(artist, 'fetchLinks')
  // eslint-disable-next-line
  }, [artistId])

  // UPDATE INTEGRATIONS when they change on artist
  const updateLinksWithIntegrations = useLinksStore(getUpdateLinksWithIntegrations)
  React.useEffect(() => {
    updateLinksWithIntegrations(artist)
  // eslint-disable-next-line
  }, [artist.integrations])

  // CLEAR STORE WHEN PAGE UNMOUNT
  React.useEffect(() => {
    return clearLinkStore
  // eslint-disable-next-line
  }, [clearLinkStore])

  return <PostsContent />
}

export default PostsPage
