import React from 'react'
import PropTypes from 'prop-types'
import useHover from '@/app/hooks/useHover'
import SideNavPrimaryLinkIcon from '@/app/SideNavPrimaryLinkIcon'
import ActiveLink from '@/elements/ActiveLink'

const SideNavPrimaryLink = ({
  href,
  icon,
  title,
  action,
  isActive,
  isExternal,
  isExpanded,
}) => {
  const [hoverRef, isHover] = useHover()

  return (
    <div ref={hoverRef}>
      {href ? (
        <ActiveLink href={href} activeClass="text-green">
          <a
            className={[
              'flex items-center relative no-underline',
            ].join(' ')}
            target={isExternal ? '_blank' : ''}
          >
            <SideNavPrimaryLinkIcon
              icon={icon}
              isActive={isActive}
              isHover={isHover}
              className="flex justify-center items-end my-0 mx-auto w-6 h-6 my-1"
            />
            <p className={[
              'ml-2 mb-0 transition-opacity',
              isActive || isHover ? 'text-green' : 'text-grey',
              isExpanded ? 'opacity-1 delay-300' : 'opacity-0 delay-100 w-0',
            ].join(' ')}
            >
              {title}
            </p>
          </a>
        </ActiveLink>
      ) : (
        <button
          onClick={action}
          className="flex mx-auto items-center relative hover:text-green"
        >
          <SideNavPrimaryLinkIcon
            icon={icon}
            isActive={isActive}
            isHover={isHover}
            className="flex justify-center items-end my-0 mx-auto w-6 h-6 my-1"
          />
          <p
            className={[
              'ml-2 mb-0 flex-shrink-0 transition-opacity',
              isActive || isHover ? 'text-green' : 'text-grey',
              isExpanded ? 'opacity-1 delay-300' : 'opacity-0 delay-100 w-0',
            ].join(' ')}
          >
            {title}
          </p>
        </button>
      )}
    </div>
  )
}

SideNavPrimaryLink.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  isExternal: PropTypes.bool,
  isExpanded: PropTypes.bool.isRequired,
}

SideNavPrimaryLink.defaultProps = {
  href: '',
  action: null,
  isExternal: false,
}

export default SideNavPrimaryLink
