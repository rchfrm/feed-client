import React from 'react'
import PropTypes from 'prop-types'

import PricingPlanTopSection from '@/PricingPlanTopSection'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import PlusCircleIcon from '@/icons/PlusCircleIcon'
import StarCircleIcon from '@/icons/StarCircleIcon'
import InsightsCircleIcon from '@/icons/InsightsCircleIcon'
import LightbulbIcon from '@/icons/LightbulbIcon'

import { capitalise } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const GetStartedPricingPlan = ({
  plan,
  showAnnualPricing,
  setSelectedPricingPlan,
  handleSidePanel,
  currency,
  isRecommended,
  isDesktop,
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
    <div
      className={[
        'w-full h-full relative',
        'shrink-0',
        'p-6',
        !isDesktop && isRecommended ? 'pt-16' : null,
        'border-solid rounded-dialogue',
        isRecommended ? 'border-[5px] border-insta' : 'border-3 border-black',
      ].join(' ')}
    >
      {isRecommended && (
        <div className={[
          'absolute left-0',
          isDesktop ? 'left-0 -top-9' : 'top-0 right-0',
          'flex items-center justify-center',
          'w-full h-8 p-3',
          'outline outline-[5px] outline-solid outline-insta',
          'rounded-t-dialogue bg-insta',
          'text-xs text-white italic',
        ].join(' ')}
        >
          <LightbulbIcon className="h-4 w-4 mr-1" fill={brandColors.white} />
          Recommended based on your settings
        </div>
      )}
      <PricingPlanTopSection
        plan={plan}
        currency={currency}
        showAnnualPricing={showAnnualPricing}
      />
      <button
        className="w-full flex justify-between px-4 py-2 mb-5 border-2 border-green border-solid rounded-dialogue font-bold"
        onClick={() => setSelectedPricingPlan(name)}
      >
        <span>Select {title}</span>
        <ArrowAltIcon
          direction="right"
        />
      </button>
      <div className="flex items-center font-normal">
        <Icon className="w-4 h-4 inline-block mr-1" />
        <div>
          <Button
            version="text"
            onClick={() => handleSidePanel(plan)}
            className="h-4 inline-block mr-1"
            trackComponentName="GetStartedPricingPlan"
          >
            Read more
          </Button>
          about the {title} tier
        </div>
      </div>
    </div>
  )
}

GetStartedPricingPlan.propTypes = {
  plan: PropTypes.object.isRequired,
  showAnnualPricing: PropTypes.bool.isRequired,
  setSelectedPricingPlan: PropTypes.func.isRequired,
  handleSidePanel: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  isRecommended: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
}

GetStartedPricingPlan.defaultProps = {
}

export default GetStartedPricingPlan
