import React from 'react'
import { useRouter } from 'next/router'
import useSignOut from '@/app/hooks/useSignOut'
import SideNavLink from '@/app/SideNavLink'
import * as ROUTES from '@/app/constants/routes'

const SideNavLinks = () => {
  const { pathname } = useRouter()
  const termsLink = 'https://tryfeed.co/legal/terms-of-service'
  const signOut = useSignOut()

  const links = [
    {
      href: ROUTES.ACCOUNT,
      title: 'settings',
      icon: 'settings',
    },
    {
      href: ROUTES.NOTIFICATIONS,
      title: 'notifications',
      icon: 'notifications',
    },
    {
      href: ROUTES.BILLING,
      title: 'billing',
      icon: 'billing',
    },
    {
      href: termsLink,
      title: 'terms',
      icon: 'terms',
      isExternal: true,
    },
    {
      title: 'sign out',
      icon: 'signout',
      action: signOut,
    },
  ]

  return (
    <nav className="flex flex-col justify-between items-center">
      {links.map(({ href, icon, action, isExternal }) => {
        const isActive = pathname === href

        return (
          <div className={['text-xs text-center mb-4 w-10'].join(' ')} key={icon}>
            <SideNavLink
              icon={icon}
              href={href}
              action={action}
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
