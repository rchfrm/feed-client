import React from 'react'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useBrowserStore from '@/hooks/useBrowserStore'

const TournamentContext = React.createContext({
  isDesktopLayout: false,
  sizes: {},
  updateSizes: () => {},
})

TournamentContext.displayName = 'TournamentContext'

const TournamentContextProvider = ({ children }) => {
  // GET DESKTOP LAYOUT TEST
  const isDesktopLayout = useBreakpointTest('xs')
  // GET SIZES
  const [sizes, setSizes] = React.useState({})
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
    const itemHeight = item.offsetHeight
    const image = item.querySelector('.TournamentsItemImage')
    const imageHeight = image.offsetHeight
    const centralColumn = item.querySelector('.TournamentItemMiddleColumn')
    const centralColumnStyles = getComputedStyle(centralColumn)
    const centralColumnWidth = centralColumn.offsetWidth + (parseInt(centralColumnStyles.marginLeft, 0) * 2)
    const centralColumnHeight = centralColumn.offsetHeight
    setSizes({
      itemWidth,
      itemHeight,
      imageHeight,
      centralColumnWidth,
      centralColumnHeight,
    })
  }, [])
  React.useEffect(() => {
    if (!containerEl.current) return
    onResize(containerEl.current)
  }, [windowWidth, onResize])
  // RUN THIS TO UPDATE ITEM SIZE
  const updateSizes = React.useCallback(() => {
    if (!containerEl.current) return
    onResize(containerEl.current)
  }, [onResize])

  return (
    <TournamentContext.Provider
      value={{
        isDesktopLayout,
        sizes,
        updateSizes,
      }}
    >
      {children}
    </TournamentContext.Provider>
  )
}

export { TournamentContext, TournamentContextProvider }
