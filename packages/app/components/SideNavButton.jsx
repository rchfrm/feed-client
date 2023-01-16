import React from 'react'
import PropTypes from 'prop-types'
import SideNavButtonIcon from '@/app/SideNavButtonIcon'
import ActiveLink from '@/elements/ActiveLink'

const SideNavButton = ({
  title,
  icon,
  href,
  matchingHrefs,
  isActive,
  shouldShowBadge,
}) => {
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
            isActive || isHover ? 'text-green' : 'text-grey',
          ].join(' ')}
        >
          <SideNavButtonIcon
            icon={icon}
            shouldShowBadge={shouldShowBadge}
            isActive={isActive}
            isHover={isHover}
            className="flex justify-center items-end my-0 mx-auto w-6 h-6 my-1"
          />
          <p className="mb-0">{ title }</p>
        </a>
      </ActiveLink>
    </div>
  )
}

SideNavButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  matchingHrefs: PropTypes.array,
  isActive: PropTypes.bool.isRequired,
  shouldShowBadge: PropTypes.bool.isRequired,
}

SideNavButton.defaultProps = {
  matchingHrefs: [],
}

export default SideNavButton
