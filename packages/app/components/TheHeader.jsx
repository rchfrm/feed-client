// IMPORT PACKAGES
import React from 'react'

import PeekElement from 'react-peek-element'
// IMPORT HOOKS
import useBrowserStore from '@/hooks/useBrowserStore'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
// IMPORT CONTEXTS
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT COMPONENTS
import TheHeaderContents from '@/app/TheHeaderContents'
import TheSubNav from '@/app/TheSubNav'
import PageHeader from '@/app/PageHeader'
// IMPORT STYLES
import styles from '@/app/TheHeader.module.css'

function TheHeader() {
  // Toggle mobile header
  const { width: windowWidth } = useBrowserStore()
  const [mobileHeader, setMobileHeader] = React.useState(null)
  const inlinePageTitle = !useBreakpointTest('xxs')
  const isDesktopLayout = useBreakpointTest('md')
  React.useEffect(() => {
    // Show peek header or not
    setMobileHeader(!isDesktopLayout)
    // Show page title below header, or not
  }, [isDesktopLayout])

  // Check if logged in or not
  const isLoggedIn = useLoggedInTest()

  // HANDLE SUB-NAV OPENING AND CLOSING
  const { subNavOpen, toggleSubNav } = React.useContext(InterfaceContext)

  // Wait until a device type has been defined
  if (typeof mobileHeader !== 'boolean') return null

  // Define header contents
  const headerContents = (
    <>
      <TheHeaderContents
        windowWidth={windowWidth}
        subNavOpen={subNavOpen}
        toggleSubNav={toggleSubNav}
        inlinePageTitle={inlinePageTitle}
        isLoggedIn={isLoggedIn}
      />
      {/* THE SUBNAV */}
      <TheSubNav
        open={subNavOpen && isLoggedIn}
        toggle={toggleSubNav}
        windowWidth={windowWidth}
      />
    </>
  )

  return (
    <>
      {mobileHeader ? (
        <>
          <PeekElement
            usePlaceHolder
            config={{
              childProps: { style: { zIndex: 28, transform: subNavOpen ? 'none' : null }, className: 'peek-element' },
            }}
          >
            {headerContents}
          </PeekElement>
          {inlinePageTitle && <PageHeader className={styles.pageTitle} />}
        </>
      ) : (
        headerContents
      )}
    </>
  )
}

export default TheHeader
