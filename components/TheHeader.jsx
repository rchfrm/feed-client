// IMPORT PACKAGES
import React from 'react'
// IMPORT HOOKS
import useOnResize from './hooks/useOnResize'
// IMPORT COMPONENTS
import TheHeaderContents from './TheHeaderContents'
import TheHeaderMobile from './TheHeaderMobile'

function TheHeader() {
  // Toggle mobile header
  const { width: windowWidth } = useOnResize({})
  const [mobileHeader, setMobileHeader] = React.useState(null)
  React.useEffect(() => {
    const isDesktopLayout = window.matchMedia('(min-width: 993px)').matches
    setMobileHeader(!isDesktopLayout)
  }, [windowWidth])

  // Wait until a device type has been defined
  if (typeof mobileHeader !== 'boolean') return null

  if (mobileHeader) return <TheHeaderMobile windowWidth={windowWidth} />
  return <TheHeaderContents windowWidth={windowWidth} />
}

export default TheHeader
