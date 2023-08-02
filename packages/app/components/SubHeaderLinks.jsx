import React from 'react'
import ActiveLink from '@/elements/ActiveLink'
import { secondaryLinks } from '@/app/helpers/navHelpers'
import artistContext from '@/app/contexts/ArtistContext'
import { Platform } from '@/app/types/api'

const SubHeaderLinks = () => {
  const { artist } = React.useContext(artistContext)
  return (
    <ul className={[
      'flex justify-center w-full md:w-auto mb-0 md:mr-4 px-auto',
      'order-2 md:order-1 mt-5 md:mt-0',
      'text-grey-dark font-display font-bold iphone8:text-xl md:text-[28px] lg:text-[32px]',
    ].join(' ')}
    >
      {secondaryLinks.map(({ href, title, matchingHrefs }) => {
        const { platform } = artist.preferences.optimization
        const hasSpotifyOrInstagramObjective = platform === Platform.SPOTIFY || platform === Platform.INSTAGRAM
        const isHomeRoute = title === 'Home'
        if (! hasSpotifyOrInstagramObjective && isHomeRoute) {
          return null
        }
        return (
          <li key={title} className="mr-3 last:mr-0 xxs:mr-8 md:mr-6 lg:mr-10">
            <ActiveLink
              href={href}
              activeClass="text-black border-b-4 border-solid border-green"
              matchingHrefs={matchingHrefs}
              className="relative no-underline"
            >
              {title}
            </ActiveLink>
          </li>
        )
      })}
    </ul>
  )
}

export default SubHeaderLinks
