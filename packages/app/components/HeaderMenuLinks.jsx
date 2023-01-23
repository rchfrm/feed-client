import React from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '@/app/contexts/UserContext'
import * as ROUTES from '@/app/constants/routes'
import { primaryLinks } from '@/app/helpers/navHelpers'
import HeaderMenuLink from '@/app/HeaderMenuLink'

const HeaderMenuLinks = () => {
  const { hasPendingEmail } = React.useContext(UserContext)
  const { pathname } = useRouter()

  return (
    <nav className="ml-2">
      <ul className={[
        'h4--text mb-0',
      ].join(' ')}
      >
        {primaryLinks.map(({ href, title, icon, isSignOut, isExternal }) => {
          const shouldShowDot = href === ROUTES.ACCOUNT && hasPendingEmail
          const isActive = pathname === href

          return (
            <HeaderMenuLink
              key={title}
              href={href}
              title={title}
              icon={icon}
              isActive={isActive}
              isExternal={isExternal}
              isSignOut={isSignOut}
              shouldShowDot={shouldShowDot}
            />
          )
        })}
      </ul>
    </nav>
  )
}

export default HeaderMenuLinks
