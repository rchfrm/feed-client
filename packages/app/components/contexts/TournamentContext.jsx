import React from 'react'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useBrowserStore from '@/hooks/useBrowserStore'

const TournamentContext = React.createContext({
  isDesktopLayout: false,
  itemWidth: 0,
})

TournamentContext.displayName = 'TournamentContext'

const TournamentContextProvider = ({ children }) => {
  // GET DESKTOP LAYOUT TEST
  const isDesktopLayout = useBreakpointTest('md')
  // GET WIDTH OF TOURNAMENT ITEM
  const [itemWidth, setItemWidth] = React.useState(0)
  // Get container el
  const containerEl = React.useRef(null)
  React.useEffect(() => {
    containerEl.current = document.getElementById('TournamentItemsContainer')
  }, [])
  const { width: windowWidth } = useBrowserStore()
  // On resize...
  React.useEffect(() => {
    if (!containerEl.current) return
    const item = containerEl.current.querySelector('.TournamentsItemAdPair')
    if (!item) return
    const itemWidth = item.offsetWidth
    setItemWidth(itemWidth)
  }, [windowWidth])

  return (
    <TournamentContext.Provider
      value={{
        isDesktopLayout,
        itemWidth,
      }}
    >
      {children}
    </TournamentContext.Provider>
  )
}

export { TournamentContext, TournamentContextProvider }
