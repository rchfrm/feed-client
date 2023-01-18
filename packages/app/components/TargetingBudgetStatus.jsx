import React from 'react'
import PropTypes from 'prop-types'
import { capitalise } from '@/helpers/utils'

const TargetingBudgetStatus = ({
  status,
  className,
}) => {
  return (
    <div className={[
      'inline-block mb-0 px-3 py-2',
      'font-bold',
      'border-solid border-2 rounded-full',
      className,
    ].join(' ')}
    >
      {capitalise(status)}
    </div>
  )
}

TargetingBudgetStatus.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

TargetingBudgetStatus.defaultProps = {
}

export default TargetingBudgetStatus
