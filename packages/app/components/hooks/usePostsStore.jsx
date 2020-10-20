import React from 'react'

import postsStore from '@/store/postsStore'

const usePostsStore = () => {
  const togglePromotionGlobal = postsStore(state => state.togglePromotionGlobal)
  const setTogglePromotionGlobal = postsStore(state => state.setTogglePromotionGlobal)
  const defaultLink = postsStore(state => state.defaultLink)
  const savedLinks = postsStore(state => state.savedLinks)
  const savedFolders = postsStore(state => state.savedFolders)
  const nestedLinks = postsStore(state => state.nestedLinks)
  const integrations = postsStore(state => state.integrations)
  const fetchLinks = postsStore(state => state.fetchLinks)
  const clearAll = postsStore(state => state.clearAll)

  const init = postsStore(state => state.init)
  const setupStore = React.useCallback((artist) => {
    init(artist)
  }, [init])

  return {
    togglePromotionGlobal,
    setTogglePromotionGlobal,
    fetchLinks,
    savedLinks,
    savedFolders,
    nestedLinks,
    integrations,
    defaultLink,
    clearAll,
    setupStore,
  }
}

export default usePostsStore
