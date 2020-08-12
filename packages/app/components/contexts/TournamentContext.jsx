import React from 'react'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useBrowserStore from '@/hooks/useBrowserStore'

const TournamentContext = React.createContext({
  isDesktopLayout: false,
  itemWidth: 0,
  updateItemWidth: () => {},
})

TournamentContext.displayName = 'TournamentContext'

const TournamentContextProvider = ({ children }) => {
  // GET DESKTOP LAYOUT TEST
  const isDesktopLayout = useBreakpointTest('xs')
  // GET WIDTH OF TOURNAMENT ITEM
  const [itemWidth, setItemWidth] = React.useState(0)
  // Get container el
  const containerEl = React.useRef(null)
  React.useEffect(() => {
    containerEl.current = document.getElementById('TournamentItemsContainer')
  }, [])
  const { width: windowWidth } = useBrowserStore()
  // On resize...
  const onResize = React.useCallback((container) => {
    const item = container.querySelector('.TournamentsItemAdPair')
    if (!item) return
    const itemWidth = item.offsetWidth
    setItemWidth(itemWidth)
  }, [])
  React.useEffect(() => {
    if (!containerEl.current) return
    onResize(containerEl.current)
  }, [windowWidth, onResize])
  // RUN THIS TO UPDATE ITEM SIZE
  const updateItemWidth = React.useCallback(() => {
    if (!containerEl.current) return
    onResize(containerEl.current)
  }, [onResize])

  return (
    <TournamentContext.Provider
      value={{
        isDesktopLayout,
        itemWidth,
        updateItemWidth,
      }}
    >
      {children}
    </TournamentContext.Provider>
  )
}

export { TournamentContext, TournamentContextProvider }
