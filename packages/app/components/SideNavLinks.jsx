import React from 'react'
import { useRouter } from 'next/router'
import useSignOut from '@/app/hooks/useSignOut'
import SideNavLink from '@/app/SideNavLink'
import { secondaryLinks } from '@/app/helpers/navHelpers'

const SideNavLinks = () => {
  const { pathname } = useRouter()
  const signOut = useSignOut()

  return (
    <nav className="flex flex-col justify-between items-center">
      {secondaryLinks.map(({ href, icon, isSignOut, isExternal, isMobile }) => {
        const isActive = pathname === href
        if (isMobile) {
          return
        }

        return (
          <div className={['text-xs text-center mb-4 w-10'].join(' ')} key={icon}>
            <SideNavLink
              icon={icon}
              href={href}
              action={isSignOut ? signOut : null}
              isActive={isActive}
              isExternal={isExternal}
            />
          </div>
        )
      })}
    </nav>
  )
}

export default SideNavLinks
