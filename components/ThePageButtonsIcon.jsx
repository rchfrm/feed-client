import React from 'react'
import PropTypes from 'prop-types'

import BudgetIcon from './icons/BudgetIcon'
import PostsIcon from './icons/PostsIcon'
import ResultsIcon from './icons/ResultsIcon'
import InsightsIcon from './icons/InsightsIcon'

const getIcon = (icon) => {
  if (icon === 'budget') return <BudgetIcon />
  if (icon === 'posts') return <PostsIcon />
  if (icon === 'results') return <ResultsIcon />
  if (icon === 'insights') return <InsightsIcon />
}

const ThePageButtonsIcon = ({ icon, className }) => {
  const iconEl = getIcon(icon)
  return (
    <figure className={className}>
      {iconEl}
    </figure>
  )
}

ThePageButtonsIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ThePageButtonsIcon.defaultProps = {
  className: '',
}


export default ThePageButtonsIcon
