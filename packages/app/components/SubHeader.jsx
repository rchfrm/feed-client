import React from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import SubHeaderProfileStatus from '@/app/SubHeaderProfileStatus'
import SubHeaderLinks from '@/app/SubHeaderLinks'

const SubHeader = () => {
  const { hasNav, isNavExpanded } = React.useContext(InterfaceContext)
  const { artistLoading } = React.useContext(ArtistContext)

  if (! hasNav) {
    return
  }

  return (
    <nav className={[
      'relative z-[21] min-h-[32px] md:min-h-[40px]',
      'self-end flex flex-col md:items-center md:flex-row md:justify-between transition-width duration-500',
      'mt-4 md:mt-0 mb-5 md:mb-15 md:px-20',
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
