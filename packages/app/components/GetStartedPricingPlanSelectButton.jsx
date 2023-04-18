import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'
import { capitalise } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const GetStartedPricingPlanSelectButton = ({
  plan,
  setSelectedPricingPlan,
}) => {
  const { name } = plan
  const title = capitalise(name)

  return (
    <Button
      version="secondary"
      onClick={() => setSelectedPricingPlan(name)}
      className="sm:w-full sm:mb-5"
      trackComponentName="GetStartedPricingPlanSelectButton"
    >
      <span className="hidden sm:block">Select {title}</span>
      <ArrowIcon
        direction="right"
        className="w-7 h-auto sm:w-auto sm:h-auto ml-1"
        fill={brandColors.black}
      />
    </Button>
  )
}

GetStartedPricingPlanSelectButton.propTypes = {
  plan: PropTypes.object.isRequired,
  setSelectedPricingPlan: PropTypes.func.isRequired,
}

export default GetStartedPricingPlanSelectButton
