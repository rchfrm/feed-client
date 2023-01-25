import React from 'react'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import useOnResize from '@/landing/hooks/useOnResize'
import LogoButton from '@/app/LogoButton'
import SideNavProfiles from '@/app/SideNavProfiles'
import SideNavPrimaryLinks from '@/app/SideNavPrimaryLinks'
import SideNavToggleButton from '@/app/SideNavToggleButton'

const SideNav = () => {
  const { width } = useOnResize()
  const contentElement = React.useRef(null)
  const { hasNav, isNavExpanded, toggleNav } = React.useContext(InterfaceContext)

  React.useEffect(() => {
    const isMobile = width < 992

    if (! isNavExpanded || ! isMobile) {
      return
    }

    toggleNav()
  }, [width, isNavExpanded, toggleNav])

  if (! hasNav) {
    return null
  }

  return (
    <div
      className={[
        'hidden md:flex flex-col justify-between',
        'fixed top-0 left-0 bottom-0 z-[22] font-display',
        isNavExpanded ? 'w-[200px]' : 'w-20',
        'md:transition-width md:duration-500',
        'bg-black',
      ].join(' ')}
    >
      <div ref={contentElement}>
        <SideNavToggleButton
          isExpanded={isNavExpanded}
          toggleNav={toggleNav}
        />
        <LogoButton
          id="sideNav"
          className="h-20 ml-3.5"
          hasWordmark={isNavExpanded}
        />
        <SideNavProfiles
          isExpanded={isNavExpanded}
        />
      </div>
      <SideNavPrimaryLinks isExpanded={isNavExpanded} />
    </div>
  )
}

export default SideNav
