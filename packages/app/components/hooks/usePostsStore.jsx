import React from 'react'

import postsStore from '@/store/postsStore'

const usePostsStore = () => {
  const togglePromotionGlobal = postsStore(state => state.togglePromotionGlobal)
  const setTogglePromotionGlobal = postsStore(state => state.setTogglePromotionGlobal)
  const defaultLink = postsStore(state => state.defaultLink)
  const savedLinks = postsStore(state => state.savedLinks)
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
    defaultLink,
    clearAll,
    setupStore,
  }
}

export default usePostsStore
