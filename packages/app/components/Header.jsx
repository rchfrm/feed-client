import React from 'react'
import PeekElement from 'react-peek-element'
import useBrowserStore from '@/hooks/useBrowserStore'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import HeaderContent from '@/app/HeaderContent'
import TheSubNav from '@/app/TheSubNav'

const Header = () => {
  const { width: windowWidth } = useBrowserStore()
  const [mobileHeader, setMobileHeader] = React.useState(null)

  const isDesktopLayout = useBreakpointTest('md')
  const isLoggedIn = useLoggedInTest()
  const { subNavOpen, toggleSubNav } = React.useContext(InterfaceContext)

  React.useEffect(() => {
    setMobileHeader(! isDesktopLayout)
  }, [isDesktopLayout])

  if (typeof mobileHeader !== 'boolean') {
    return null
  }

  const headerContents = (
    <>
      <HeaderContent
        windowWidth={windowWidth}
        subNavOpen={subNavOpen}
        toggleSubNav={toggleSubNav}
        isLoggedIn={isLoggedIn}
        mobileHeader={mobileHeader}
      />
      <TheSubNav
        open={subNavOpen && isLoggedIn}
        toggle={toggleSubNav}
        windowWidth={windowWidth}
      />
    </>
  )

  return (
    mobileHeader ? (
      <PeekElement
        usePlaceHolder
        config={{
          childProps: { style: { zIndex: 28, transform: subNavOpen ? 'none' : null }, className: 'peek-element' },
        }}
      >
        {headerContents}
      </PeekElement>
    ) : (
      headerContents
    )
  )
}

export default Header
