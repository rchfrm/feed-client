import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import useSignOut from '@/app/hooks/useSignOut'
import SideNavPrimaryLink from '@/app/SideNavPrimaryLink'
import { primaryLinks } from '@/app/helpers/navHelpers'

const SideNavPrimaryLinks = ({ isExpanded }) => {
  const { pathname } = useRouter()
  const signOut = useSignOut()

  return (
    <nav className={[
      'flex flex-col ml-3 mb-3 px-4 text-xs',
    ].join(' ')}
    >
      {primaryLinks.map(({ href, icon, title, isSignOut, isExternal, isMobile }) => {
        const isActive = pathname === href
        if (isMobile) {
          return
        }

        return (
          <div key={icon}>
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
