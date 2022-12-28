import React from 'react'
import PropTypes from 'prop-types'
import JoystickIcon from '@/icons/JoystickIcon'
import PostsIcon from '@/icons/PostsIcon'
import StarIcon from '@/icons/StarIcon'
import InsightsIcon from '@/icons/InsightsIcon'
import FaqIcon from '@/icons/FaqIcon'
import NotificationDot from '@/elements/NotificationDot'
import brandColors from '@/constants/brandColors'

const getIcon = (icon) => {
  if (icon === 'posts') return PostsIcon
  if (icon === 'controls') return JoystickIcon
  if (icon === 'results') return StarIcon
  if (icon === 'insights') return InsightsIcon
  if (icon === 'faqs') return FaqIcon
}

const SideNavButtonIcon = ({
  icon,
  isActive,
  isHover,
  shouldShowBadge,
  className,
}) => {
  const Icon = getIcon(icon, isActive)

  return (
    <>
      {shouldShowBadge && <NotificationDot style={{ top: '-0.3rem', right: '0.3rem' }} />}
      <figure
        className={className}
      >
        <Icon
          color={isActive || isHover ? brandColors.green : brandColors.grey}
          fill={isActive || isHover ? brandColors.green : brandColors.grey}
        />
      </figure>
    </>
  )
}

SideNavButtonIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  shouldShowBadge: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  isHover: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

SideNavButtonIcon.defaultProps = {
  className: '',
  shouldShowBadge: false,
}

export default SideNavButtonIcon
