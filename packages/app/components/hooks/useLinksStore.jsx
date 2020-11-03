import React from 'react'

import linksStore from '@/store/linksStore'

const useLinksStore = () => {
  const togglePromotionGlobal = linksStore(state => state.togglePromotionGlobal)
  const setTogglePromotionGlobal = linksStore(state => state.setTogglePromotionGlobal)
  const defaultLink = linksStore(state => state.defaultLink)
  const savedLinks = linksStore(state => state.savedLinks)
  const savedFolders = linksStore(state => state.savedFolders)
  const nestedLinks = linksStore(state => state.nestedLinks)
  const integrations = linksStore(state => state.integrations)
  const fetchLinks = linksStore(state => state.fetchLinks)
  const linksLoading = linksStore(state => state.linksLoading)
  const clearAll = linksStore(state => state.clearAll)

  const init = linksStore(state => state.init)
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
    integrations,
    linksLoading,
    defaultLink,
    clearAll,
    setupStore,
  }
}

export default useLinksStore
