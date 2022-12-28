import React from 'react'
import PropTypes from 'prop-types'
import SideNavLinkIcon from '@/app/SideNavLinkIcon'
import ActiveLink from '@/elements/ActiveLink'

const SideNavLink = ({
  icon,
  href,
  action,
  isActive,
  isExternal,
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
      {href ? (
        <ActiveLink href={href} activeClass="text-green">
          <a
            className={[
              'relative no-underline',
            ].join(' ')}
            target={isExternal ? '_blank' : ''}
          >
            <SideNavLinkIcon
              icon={icon}
              isActive={isActive}
              isHover={isHover}
              className="flex justify-center items-end my-0 mx-auto w-6 h-6 my-1"
            />
          </a>
        </ActiveLink>
      ) : (
        <button
          onClick={action}
          className="relative hover:text-green"
        >
          <SideNavLinkIcon
            icon={icon}
            isActive={isActive}
            isHover={isHover}
            className="flex justify-center items-end my-0 mx-auto w-6 h-6 my-1"
          />
        </button>
      )}
    </div>
  )
}

SideNavLink.propTypes = {
  icon: PropTypes.string.isRequired,
  href: PropTypes.string,
  action: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  isExternal: PropTypes.bool,
}

SideNavLink.defaultProps = {
  href: '',
  action: null,
  isExternal: false,
}

export default SideNavLink
