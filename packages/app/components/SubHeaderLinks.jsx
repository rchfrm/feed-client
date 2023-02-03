import React from 'react'
import ActiveLink from '@/elements/ActiveLink'
import { secondaryLinks } from '@/app/helpers/navHelpers'

const SubHeaderLinks = () => {
  return (
    <ul className={[
      'flex justify-center w-full md:w-auto mb-0 md:mr-2 px-auto',
      'order-2 md:order-1 mt-5 md:mt-0',
      'text-grey-dark font-display font-bold iphone8:text-xl md:text-2xl',
    ].join(' ')}
    >
      {secondaryLinks.map(({ href, title, matchingHrefs }) => (
        <li key={title} className="mr-3 last:mr-0 xxs:mr-8 md:mr-6 lg:mr-10">
          <ActiveLink href={href} activeClass="text-black border-b-4 border-solid border-green" matchingHrefs={matchingHrefs}>
            <a className="relative no-underline pb-1">
              {title}
            </a>
          </ActiveLink>
        </li>
      ))}
    </ul>
  )
}

export default SubHeaderLinks
