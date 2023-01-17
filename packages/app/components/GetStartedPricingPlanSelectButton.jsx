import React from 'react'
import PropTypes from 'prop-types'
import ButtonNew from '@/elements/ButtonNew'
import ArrowIcon from '@/icons/ArrowIcon'
import { capitalise } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const GetStartedPricingPlanSelectButton = ({
  plan,
  setSelectedPricingPlan,
  isDisabled,
}) => {
  const { name } = plan
  const title = capitalise(name)

  return (
    <ButtonNew
      version="secondary"
      onClick={() => setSelectedPricingPlan(name)}
      className="sm:w-full sm:mb-5"
      isDisabled={isDisabled}
      trackComponentName="GetStartedPricingPlanSelectButton"
    >
      <span className="hidden sm:block">Select {title}</span>
      <ArrowIcon
        direction="right"
        className="w-7 h-auto sm:w-auto sm:h-auto ml-1"
        fill={isDisabled ? brandColors.grey : brandColors.black}
      />
    </ButtonNew>
  )
}

GetStartedPricingPlanSelectButton.propTypes = {
  plan: PropTypes.object.isRequired,
  setSelectedPricingPlan: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
}

GetStartedPricingPlanSelectButton.defaultProps = {
  isDisabled: false,
}

export default GetStartedPricingPlanSelectButton
