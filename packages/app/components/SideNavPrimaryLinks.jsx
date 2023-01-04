import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import useSignOut from '@/app/hooks/useSignOut'
import SideNavPrimaryLink from '@/app/SideNavPrimaryLink'
import { secondaryLinks } from '@/app/helpers/navHelpers'

const SideNavPrimaryLinks = ({ isExpanded }) => {
  const { pathname } = useRouter()
  const signOut = useSignOut()

  return (
    <nav className={[
      'flex flex-col px-4',
      isExpanded ? null : 'items-center',
    ].join(' ')}
    >
      {secondaryLinks.map(({ href, icon, title, isSignOut, isExternal, isMobile }) => {
        const isActive = pathname === href
        if (isMobile) {
          return
        }

        return (
          <div className={['text-xs text-center mb-4 w-10'].join(' ')} key={icon}>
            <SideNavPrimaryLink
              href={href}
              icon={icon}
              title={title}
              action={isSignOut ? signOut : null}
              isActive={isActive}
              isExternal={isExternal}
              isExpanded={isExpanded}
            />
          </div>
        )
      })}
    </nav>
  )
}

SideNavPrimaryLinks.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
}

export default SideNavPrimaryLinks
