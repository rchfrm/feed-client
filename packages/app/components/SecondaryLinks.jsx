import React from 'react'
import ActiveLink from '@/elements/ActiveLink'
import { secondaryLinks } from '@/app/helpers/navHelpers'
import { useRouter } from 'next/router'
import * as ROUTES from '@/app/constants/routes'

const SecondaryLinks = () => {
  const { pathname } = useRouter()

  if (! ROUTES.generalPages.includes(pathname)) {
    return
  }

  return (
    <nav>
      <ul className={[
        'flex justify-center w-full relative z-50',
        'mb-8 xs:mb-10 md:mb-14 px-auto',
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
