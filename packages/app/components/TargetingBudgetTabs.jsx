import React from 'react'
import PropTypes from 'prop-types'

import { capitalise } from '@/helpers/utils'

const TargetingBudgetTabs = ({
  budgetType,
  setBudgetType,
}) => {
  const budgetTypes = ['daily', 'campaign']

  return (
    <div className="flex mb-6 text-black">
      {budgetTypes.map((type) => (
        <button
          key={type}
          className={[
            'w-44 text-sm xxs:text-base p-3 xxs:p-4',
            type === budgetType ? 'border-solid border-green border-t-3 font-bold' : 'bg-gradient-to-t from-grey-1 text-grey-2 hover:text-grey-3 transition-colors duration-200',
          ].join(' ')}
          onClick={() => setBudgetType(type)}
        >
          {capitalise(type)} budget
        </button>
      ))}
    </div>
  )
}

TargetingBudgetTabs.propTypes = {
  budgetType: PropTypes.string.isRequired,
  setBudgetType: PropTypes.func.isRequired,
}

TargetingBudgetTabs.defaultProps = {
}

export default TargetingBudgetTabs
