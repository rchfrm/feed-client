import React from 'react'
import ActiveLink from '@/elements/ActiveLink'
import { primaryLinks } from '@/app/helpers/navHelpers'

const SecondaryLinks = () => {
  return (
    <nav>
      <ul className={[
        'flex justify-center w-full',
        'mb-8 xs:mb-10 md:mb-14 px-auto',
        'text-grey-dark font-display font-bold iphone8:text-xl md:text-2xl',
      ].join(' ')}
      >
        {primaryLinks.map(({ href, title, matchingHrefs }) => (
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
