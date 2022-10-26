import React from 'react'
import PropTypes from 'prop-types'

import { capitalise } from '@/helpers/utils'

const TargetingDailyBudgetStatus = ({
  status,
  className,
}) => {
  return (
    <div className={[
      'inline-block mb-0 px-3 py-1',
      'font-bold',
      'border-solid border-2 rounded-full',
      className,
    ].join(' ')}
    >
      {capitalise(status)}
    </div>
  )
}

TargetingDailyBudgetStatus.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

TargetingDailyBudgetStatus.defaultProps = {
}

export default TargetingDailyBudgetStatus
