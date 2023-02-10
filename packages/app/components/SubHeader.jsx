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
      'relative md:absolute top-0 inset-x-0 z-[21] md:h-30 md:bg-offwhite',
      'flex items-center',
      'mt-3 md:mt-0 mb-10 md:mb-0',
    ].join(' ')}
    >
      <div className="w-full max-w-[1440px] mx-auto md:px-10 flex flex-col">
        {! artistLoading && (
          <div className={[
            'flex flex-col md:flex-row md:items-center md:justify-between self-end',
            'md:pl-20',
            'transition-width duration-500',
            isNavExpanded ? '!w-[calc(100%-120px)]' : '!w-full',
          ].join(' ')}
          >
            <SubHeaderProfileStatus />
            <SubHeaderLinks />
          </div>
        )}
      </div>
    </nav>
  )
}

export default SubHeader
