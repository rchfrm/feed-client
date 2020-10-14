import React from 'react'

import postsStore from '@/store/postsStore'

const usePostsStore = () => {
  const defaultLink = postsStore(state => state.defaultLink)
  const savedLinks = postsStore(state => state.savedLinks)
  const fetchLinks = postsStore(state => state.fetchLinks)
  const init = postsStore(state => state.init)

  const setupStore = React.useCallback((artist) => {
    init(artist)
  }, [init])

  return {
    setupStore,
    fetchLinks,
    savedLinks,
    defaultLink,
  }
}

export default usePostsStore
