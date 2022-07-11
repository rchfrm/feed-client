import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import PlusCircleIcon from '@/icons/PlusCircleIcon'
import StarCircleIcon from '@/icons/StarCircleIcon'
import InsightsCircleIcon from '@/icons/InsightsCircleIcon'

import { capitalise } from '@/helpers/utils'

const GetStartedPricingPlanReadMoreButton = ({
  plan,
  handleSidePanel,
}) => {
  const { name } = plan

  const title = capitalise(name)
  const icons = {
    basic: PlusCircleIcon,
    growth: InsightsCircleIcon,
    pro: StarCircleIcon,
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
      <Icon className="w-4 h-4 inline-block mr-1" />
      <div>
        <Button
          version="text"
          onClick={() => handleSidePanel(plan)}
          className="h-4 inline-block mr-1"
          trackComponentName="GetStartedPricingPlanReadMoreButton"
        >
          Read more
        </Button>
        about the {title} tier
      </div>
    </div>
  )
}

GetStartedPricingPlanReadMoreButton.propTypes = {
  plan: PropTypes.object.isRequired,
  handleSidePanel: PropTypes.func.isRequired,
}

GetStartedPricingPlanReadMoreButton.defaultProps = {
}

export default GetStartedPricingPlanReadMoreButton
