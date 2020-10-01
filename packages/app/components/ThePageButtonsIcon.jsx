import React from 'react'
import PropTypes from 'prop-types'

import BudgetEuroIcon from '@/icons/BudgetEuroIcon'
import BudgetDollarIcon from '@/icons/BudgetDollarIcon'
import BudgetPoundIcon from '@/icons/BudgetPoundIcon'
import JoystickIcon from '@/icons/JoystickIcon'
import PostsIcon from '@/icons/PostsIcon'
import ResultsIcon from '@/icons/ResultsIcon'
import InsightsIcon from '@/icons/InsightsIcon'

import ThePageButtonsBadge from '@/app/ThePageButtonsBadge'

import styles from '@/app/ThePageButtons.module.css'

const getCurrencyIcon = (icon, currency) => {
  if (currency === 'gbp') return <BudgetPoundIcon className={styles.shortIcon} />
  if (currency === 'eur') return <BudgetEuroIcon className={styles.shortIcon} />
  return <BudgetDollarIcon />
}

const getIcon = (icon, currency) => {
  if (icon === 'budget') return getCurrencyIcon(icon, currency)
  if (icon === 'controls') return <JoystickIcon />
  if (icon === 'posts') return <PostsIcon />
  if (icon === 'results') return <ResultsIcon />
  if (icon === 'insights') return <InsightsIcon />
}

const ThePageButtonsIcon = ({ icon, className, currency, showBadge }) => {
  const iconEl = getIcon(icon, currency.toLowerCase())
  return (
    <>
      {showBadge && <ThePageButtonsBadge />}
      <figure className={className}>
        {iconEl}
      </figure>
    </>
  )
}

ThePageButtonsIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  currency: PropTypes.string,
  showBadge: PropTypes.bool,
}

ThePageButtonsIcon.defaultProps = {
  className: '',
  currency: '',
  showBadge: false,
}


export default ThePageButtonsIcon
