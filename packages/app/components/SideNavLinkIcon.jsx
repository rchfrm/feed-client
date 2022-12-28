import React from 'react'
import PropTypes from 'prop-types'
import JoystickIcon from '@/icons/JoystickIcon'
import EmailIcon from '@/icons/EmailIcon'
import GearIcon from '@/icons/GearIcon'
import InsightsIcon from '@/icons/InsightsIcon'
import StarIcon from '@/icons/StarIcon'
import brandColors from '@/constants/brandColors'

const getIcon = (icon) => {
  if (icon === 'settings') return GearIcon
  if (icon === 'notifications') return EmailIcon
  if (icon === 'billing') return JoystickIcon
  if (icon === 'terms') return InsightsIcon
  if (icon === 'signout') return StarIcon
}

const SideNavLinkIcon = ({
  icon,
  isActive,
  isHover,
  className,
}) => {
  const Icon = getIcon(icon, isActive)

  return (
    <figure className={className}>
      <Icon
        color={isActive || isHover ? brandColors.green : brandColors.grey}
        fill={isActive || isHover ? brandColors.green : brandColors.grey}
      />
    </figure>
  )
}

SideNavLinkIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isHover: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

SideNavLinkIcon.defaultProps = {
  className: '',
}

export default SideNavLinkIcon
