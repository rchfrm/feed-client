import React from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import SubHeaderProfileStatus from '@/app/SubHeaderProfileStatus'
import SubHeaderLinks from '@/app/SubHeaderLinks'
import { useRouter } from 'next/router'
import * as ROUTES from '@/app/constants/routes'

const SubHeader = () => {
  const { hasNav, isNavExpanded } = React.useContext(InterfaceContext)
  const { artistLoading } = React.useContext(ArtistContext)
  const { pathname } = useRouter()

  if (! hasNav || ! ROUTES.generalPages.includes(pathname)) {
    return
  }

  return (
    <nav className={[
      'relative z-[21] md:h-30',
      'self-end flex flex-col md:items-center md:flex-row md:justify-between transition-width duration-500',
      'mt-3 md:-mt-10 mb-5 md:mb-15 md:px-10 md:bg-offwhite md:-mr-10',
      isNavExpanded ? '!w-[calc(100%-120px)]' : '!w-full',
    ].join(' ')}
    >
      {! artistLoading && (
        <>
          <SubHeaderProfileStatus />
          <SubHeaderLinks />
        </>
      )}
    </nav>
  )
}

export default SubHeader
