import React from 'react'
import PropTypes from 'prop-types'

const TargetingBudgetSwitchButton = ({
  isDailyBudget,
  setIsDailyBudget,
}) => {
  const onClick = async () => {
    setIsDailyBudget((isDailyBudget) => !isDailyBudget)
  }

  return (
    <a
      className={[
        'absolute right-0 bottom-0',
        'no-underline',
        'px-3 py-1',
        'text-white',
        'rounded-full',
        'bg-insta',
      ].join(' ')}
      style={{ paddingBottom: '0.3rem' }}
      role="button"
      onClick={onClick}
    >
      Set {isDailyBudget ? 'campaign' : 'daily'} budget
    </a>
  )
}

TargetingBudgetSwitchButton.propTypes = {
  isDailyBudget: PropTypes.bool.isRequired,
  setIsDailyBudget: PropTypes.func.isRequired,
}

TargetingBudgetSwitchButton.defaultProps = {
}

export default TargetingBudgetSwitchButton
