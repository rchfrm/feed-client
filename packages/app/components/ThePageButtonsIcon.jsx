import React from 'react'
import PropTypes from 'prop-types'

import JoystickIcon from '@/icons/JoystickIcon'
import PostsIcon from '@/icons/PostsIcon'
import ResultsIcon from '@/icons/ResultsIcon'
import InsightsIcon from '@/icons/InsightsIcon'

import NotificationDot from '@/elements/NotificationDot'

const getIcon = (icon) => {
  if (icon === 'controls') return <JoystickIcon />
  if (icon === 'posts') return <PostsIcon />
  if (icon === 'results') return <ResultsIcon />
  if (icon === 'insights') return <InsightsIcon />
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
