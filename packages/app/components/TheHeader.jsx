// IMPORT PACKAGES
import React from 'react'

import PeekElement from 'react-peek-element'
// IMPORT HOOKS
import useOnResize from '@/hooks/useOnResize'
import useLoggedInTest from '@/hooks/useLoggedInTest'
// IMPORT CONTEXTS
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
// IMPORT COMPONENTS
import TheHeaderContents from '@/app/TheHeaderContents'
import TheSubNav from '@/app/TheSubNav'
import PageHeader from '@/app/PageHeader'
// IMPORT STYLES
import styles from '@/app/TheHeader.module.css'

function TheHeader() {
  // Toggle mobile header
  const { width: windowWidth } = useOnResize()
  const [mobileHeader, setMobileHeader] = React.useState(null)
  const [inlinePageTitle, setInlinePageTitle] = React.useState(true)
  React.useEffect(() => {
    // Show peek header or not
    const isDesktopLayout = window.matchMedia('(min-width: 993px)').matches
    setMobileHeader(!isDesktopLayout)
    // Show page title below header, or not
    const inlinePageTitle = windowWidth < 450
    setInlinePageTitle(inlinePageTitle)
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
        <>
          <PeekElement
            usePlaceHolder
            config={{
              childProps: { style: { zIndex: 28 }, className: 'peek-element' },
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
