import React from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import ActiveLink from '@/elements/ActiveLink'
import { secondaryLinks } from '@/app/helpers/navHelpers'
import { useRouter } from 'next/router'
import * as ROUTES from '@/app/constants/routes'

const SecondaryLinks = () => {
  const { pathname } = useRouter()
  const { isNavExpanded } = React.useContext(InterfaceContext)

  const { artistLoading } = React.useContext(ArtistContext)


  if (! ROUTES.generalPages.includes(pathname) || artistLoading) {
    return
  }

  return (
    <nav className={[
      'relative z-[21]',
      'self-end transition-width duration-500',
      'mt-6 md:mt-0 mb-0 md:mb-10 px-20',
      isNavExpanded ? '!w-[calc(100%-120px)]' : '!w-full',
    ].join(' ')}
    >
      <ul className={[
        'flex justify-center',
        'text-grey-3 font-bold iphone8:text-xl md:text-2xl',
      ].join(' ')}
      >
        {secondaryLinks.map(({ href, title, matchingHrefs }) => (
          <li key={title} className="mr-3 last:mr-0 xxs:mr-8">
            <ActiveLink href={href} activeClass="text-black border-b-4 border-solid border-green" matchingHrefs={matchingHrefs}>
              <a className="relative no-underline pb-1">
                {title}
              </a>
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SecondaryLinks
