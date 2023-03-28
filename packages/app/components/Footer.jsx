import React from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import FooterLinks from '@/app/FooterLinks'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import Feed from '@/elements/Feed'

const thisYear = new Date().getFullYear()

const Footer = () => {
  const isLoggedIn = useLoggedInTest()
  const { auth } = React.useContext(AuthContext)
  const { isNavExpanded, hasNav } = React.useContext(InterfaceContext)

  return (
    <footer className={[
      'mt-auto pt-5 md:pb-5',
      'transition-width duration-500',
      isLoggedIn ? 'md:pl-20' : null,
      isLoggedIn && hasNav ? 'flex self-end' : 'self-center',
      isNavExpanded ? '!w-[calc(100%-120px)]' : '!w-full',
    ].join(' ')}
    >
      {(! hasNav) && (
        <FooterLinks hasAuth={!! auth.token} />
      )}
      <p className="text-[10px] mb-0">
        &copy; {thisYear} <Feed />
      </p>
    </footer>
  )
}

export default Footer
