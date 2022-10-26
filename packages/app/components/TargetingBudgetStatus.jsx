import React from 'react'
import PropTypes from 'prop-types'

import { capitalise } from '@/helpers/utils'

const TargetingDailyBudgetStatus = ({
  status,
}) => {
  const isActive = status === 'active'

  return (
    <div className={[
      'inline-block mb-0 px-3 py-1',
      'font-bold',
      'border-solid border-2 rounded-full',
      isActive ? 'text-green border-green' : 'text-red border-red',
    ].join(' ')}
    >
      {capitalise(status)}
    </div>
  )
}

TargetingDailyBudgetStatus.propTypes = {
  status: PropTypes.string.isRequired,
}

TargetingDailyBudgetStatus.defaultProps = {
}

export default TargetingDailyBudgetStatus
