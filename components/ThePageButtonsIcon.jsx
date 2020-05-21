import React from 'react'
import PropTypes from 'prop-types'

import BudgetEuroIcon from './icons/BudgetEuroIcon'
import BudgetDollarIcon from './icons/BudgetDollarIcon'
import BudgetPoundIcon from './icons/BudgetPoundIcon'
import PostsIcon from './icons/PostsIcon'
import ResultsIcon from './icons/ResultsIcon'
import InsightsIcon from './icons/InsightsIcon'

const getCurrencyIcon = (icon, currency) => {
  if (currency === 'gbp') return <BudgetPoundIcon />
  if (currency === 'eur') return <BudgetEuroIcon />
  return <BudgetDollarIcon />
}

const getIcon = (icon, currency) => {
  if (icon === 'budget') return getCurrencyIcon(icon, currency)
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
