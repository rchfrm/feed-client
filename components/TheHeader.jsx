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
  const [mobileHeader, setMobileHeader] = React.useState(true)
  React.useEffect(() => {
    const isDesktopLayout = window.matchMedia('(min-width: 993px)').matches
    setMobileHeader(!isDesktopLayout)
  }, [windowWidth])

  if (mobileHeader) return <TheHeaderMobile />
  return <TheHeaderContents />
}

export default TheHeader
