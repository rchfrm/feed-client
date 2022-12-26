import React from 'react'
import SideNavButtonIcon from '@/app/SideNavButtonIcon'
import ActiveLink from '@/elements/ActiveLink'

const SideNavButton = ({ title, icon, href, matchingHrefs, isActive, showBadge }) => {
  const [isHover, setIsHover] = React.useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMousLeave = () => {
    setIsHover(false)
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMousLeave}
    >
      <ActiveLink href={href} activeClass="text-green" matchingHrefs={matchingHrefs}>
        <a
          className={[
            'relative no-underline',
            'hover:text-green',
            isActive || isHover ? 'text-green' : 'text-grey-2',
          ].join(' ')}
        >
          <SideNavButtonIcon
            icon={icon}
            className="flex justify-center items-end my-0 mx-auto w-6 h-6 my-1"
            showBadge={showBadge}
            isActive={isActive}
            isHover={isHover}
          />
          <p className="mb-0">{ title }</p>
        </a>
      </ActiveLink>
    </div>
  )
}

export default SideNavButton
