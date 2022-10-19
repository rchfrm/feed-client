import React from 'react'
import PropTypes from 'prop-types'

import TargetingBudgetTabsAlert from '@/app/TargetingBudgetTabsAlert'

import { capitalise } from '@/helpers/utils'

const TargetingBudgetTabs = ({
  budgetType,
  setBudgetType,
  hasActiveCampaignBudget,
  targetingState,
}) => {
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const budgetTypes = ['daily', 'campaign']

  const handleClick = (type) => {
    if ((budgetType === 'campaign' && hasActiveCampaignBudget) || (budgetType === 'daily' && targetingState.status === 1)) {
      setShouldShowAlert(true)
      return
    }

    setBudgetType(type)
  }

  return (
    <>
      <div className="flex mb-6 text-black">
        {budgetTypes.map((type) => (
          <button
            key={type}
            className={[
              'w-44 text-sm xxs:text-base p-3 xxs:p-4',
              type === budgetType ? 'border-solid border-green border-t-3 font-bold' : 'bg-gradient-to-t from-grey-1 text-grey-2 hover:text-grey-3 transition-colors duration-200',
            ].join(' ')}
            onClick={() => handleClick(type)}
          >
            {capitalise(type)} budget
          </button>
        ))}
      </div>
      {shouldShowAlert && (
        <TargetingBudgetTabsAlert
          show={shouldShowAlert}
          budgetType={budgetType}
          setShouldShowAlert={setShouldShowAlert}
        />
      )}
    </>
  )
}

TargetingBudgetTabs.propTypes = {
  budgetType: PropTypes.string.isRequired,
  setBudgetType: PropTypes.func.isRequired,
  hasActiveCampaignBudget: PropTypes.bool.isRequired,
  targetingState: PropTypes.object.isRequired,
}

TargetingBudgetTabs.defaultProps = {
}

export default TargetingBudgetTabs
