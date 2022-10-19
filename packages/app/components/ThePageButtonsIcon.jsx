import React from 'react'
import PropTypes from 'prop-types'

import JoystickIcon from '@/icons/JoystickIcon'
import PostsIcon from '@/icons/PostsIcon'
import StarIcon from '@/icons/StarIcon'
import InsightsIcon from '@/icons/InsightsIcon'
import GiftIcon from '@/icons/GiftIcon'

import NotificationDot from '@/elements/NotificationDot'
import brandColors from '@/constants/brandColors'

const getIcon = (icon) => {
  if (icon === 'controls') return <JoystickIcon />
  if (icon === 'posts') return <PostsIcon />
  if (icon === 'results') return <StarIcon />
  if (icon === 'insights') return <InsightsIcon />
  if (icon === 'faqs') return <GiftIcon color={brandColors.instagram.bg} secondaryColor={brandColors.green} />
}

const ThePageButtonsIcon = ({ icon, className, showBadge }) => {
  const iconEl = getIcon(icon)
  return (
    <>
      {showBadge && <NotificationDot style={{ top: '-0.3rem', right: '0.3rem' }} />}
      <figure className={className}>
        {iconEl}
      </figure>
    </>
  )
}

ThePageButtonsIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  showBadge: PropTypes.bool,
}

ThePageButtonsIcon.defaultProps = {
  className: '',
  showBadge: false,
}


export default ThePageButtonsIcon
