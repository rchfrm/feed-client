// IMPORT PACKAGES
import React from 'react'
// IMPORT HOOKS
import useOnResize from './hooks/useOnResize'
import useLoggedInTest from './hooks/useLoggedInTest'
// IMPORT CONTEXTS
import { InterfaceContext } from './contexts/InterfaceContext'
// IMPORT COMPONENTS
import TheHeaderContents from './TheHeaderContents'
import TheSubNav from './TheSubNav'
import PeekElement from './PeekElement'

function TheHeader() {
  // Toggle mobile header
  const { width: windowWidth } = useOnResize({})
  const [mobileHeader, setMobileHeader] = React.useState(null)
  React.useEffect(() => {
    const isDesktopLayout = window.matchMedia('(min-width: 993px)').matches
    setMobileHeader(!isDesktopLayout)
  }, [windowWidth])

  // Check if logged in or not
  const isLoggedIn = useLoggedInTest()

  // HANDLE SUB-NAV OPENING AND CLOSING
  const { subNavOpen, toggleSubNav } = React.useContext(InterfaceContext)

  // Wait until a device type has been defined
  if (typeof mobileHeader !== 'boolean') return null

  // Define header contents
  const headerContents = (
    <>
      <TheHeaderContents windowWidth={windowWidth} subNavOpen={subNavOpen} toggleSubNav={toggleSubNav} />
      {/* THE SUBNAV */}
      <TheSubNav open={subNavOpen && isLoggedIn} toggle={toggleSubNav} windowWidth={windowWidth} />
    </>
  )

  return (
    <>
      {mobileHeader ? (
        <PeekElement usePlaceHolder config={{ childProps: { style: { zIndex: 28 } } }}>
          {headerContents}
        </PeekElement>
      ) : (
        headerContents
      )}
    </>
  )
}

export default TheHeader
