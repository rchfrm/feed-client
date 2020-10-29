import React from 'react'

import postsStore from '@/store/postsStore'

const usePostsStore = () => {
  const togglePromotionGlobal = postsStore(state => state.togglePromotionGlobal)
  const setTogglePromotionGlobal = postsStore(state => state.setTogglePromotionGlobal)
  const defaultLink = postsStore(state => state.defaultLink)
  const savedLinks = postsStore(state => state.savedLinks)
  const savedFolders = postsStore(state => state.savedFolders)
  const nestedLinks = postsStore(state => state.nestedLinks)
  const looseLinks = postsStore(state => state.looseLinks)
  const integrations = postsStore(state => state.integrations)
  const fetchLinks = postsStore(state => state.fetchLinks)
  const linksLoading = postsStore(state => state.linksLoading)
  const clearAll = postsStore(state => state.clearAll)

  const init = postsStore(state => state.init)
  const setupStore = React.useCallback((artist, action) => {
    init(artist, action)
  }, [init])

  return {
    togglePromotionGlobal,
    setTogglePromotionGlobal,
    fetchLinks,
    savedLinks,
    savedFolders,
    nestedLinks,
    looseLinks,
    integrations,
    linksLoading,
    defaultLink,
    clearAll,
    setupStore,
  }
}

export default usePostsStore
