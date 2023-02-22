import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import PlusIcon from '@/icons/PlusIcon'
import StarIcon from '@/icons/StarIcon'
import InsightsIcon from '@/icons/InsightsIcon'
import { capitalise } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const GetStartedPricingPlanReadMoreButton = ({
  plan,
  handleSidePanel,
  isDisabled,
}) => {
  const { name } = plan

  const title = capitalise(name)
  const icons = {
    free: PlusIcon,
    growth: InsightsIcon,
    pro: StarIcon,
  }

  const Icon = icons[name]

  return (
    <div className={[
      'absolute -bottom-6 sm:bottom-auto sm:relative',
      'transform -translate-x-1/2 left-1/2',
      'flex items-center font-normal',
      'whitespace-nowrap sm:whitespace-normal',
      'text-xs sm:text-base',
    ].join(' ')}
    >
      <div className="flex items-center justify-center w-4 h-4 mr-1 rounded-full bg-grey-dark">
        <Icon className="w-3 h-3" fill={brandColors.offwhite} />
      </div>
      <div>
        <Button
          version="text"
          onClick={() => handleSidePanel(plan, isDisabled)}
          className="h-4 mr-1"
          trackComponentName="GetStartedPricingPlanReadMoreButton"
        >
          Read more
        </Button>
        about the {title} plan
      </div>
    </div>
  )
}

GetStartedPricingPlanReadMoreButton.propTypes = {
  plan: PropTypes.object.isRequired,
  handleSidePanel: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

GetStartedPricingPlanReadMoreButton.defaultProps = {
}

export default GetStartedPricingPlanReadMoreButton
