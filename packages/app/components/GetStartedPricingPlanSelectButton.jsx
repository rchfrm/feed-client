import React from 'react'
import PropTypes from 'prop-types'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { capitalise } from '@/helpers/utils'

const GetStartedPricingPlanSelectButton = ({
  plan,
  setSelectedPricingPlan,
}) => {
  const { name } = plan
  const title = capitalise(name)

  return (
    <button
      className={[
        'sm:w-full flex justify-between',
        'px-0 sm:px-4 py-2 sm:mb-5',
        'sm:border-2 sm:border-green sm:border-solid sm:rounded-dialogue',
        'font-bold',
      ].join(' ')}
      onClick={() => setSelectedPricingPlan(name)}
    >
      <span className="hidden sm:block">Select {title}</span>
      <ArrowAltIcon
        direction="right"
        className="w-6 h-6 sm:w-auto sm:h-auto"
      />
    </button>
  )
}

GetStartedPricingPlanSelectButton.propTypes = {
  plan: PropTypes.object.isRequired,
  setSelectedPricingPlan: PropTypes.func.isRequired,
}

GetStartedPricingPlanSelectButton.defaultProps = {
}

export default GetStartedPricingPlanSelectButton
