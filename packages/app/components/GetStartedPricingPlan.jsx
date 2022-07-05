import React from 'react'
import PropTypes from 'prop-types'

import PricingPlanTopSection from '@/PricingPlanTopSection'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import PlusCircleIcon from '@/icons/PlusCircleIcon'
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
}) => {
  const { name } = plan
  const title = capitalise(name)

  return (
    <div
      className={[
        'w-full h-full relative',
        'shrink-0',
        'p-6',
        'border-solid rounded-dialogue',
        isRecommended ? 'border-[5px] border-insta' : 'border-3 border-black',
      ].join(' ')}
    >
      {isRecommended && (
        <div className={[
          'absolute left-0 -top-9',
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
        <PlusCircleIcon
          className="w-4 h-4 inline-block mr-2"
        />
        <Button
          version="text"
          onClick={() => handleSidePanel(plan)}
          className="inline-block mr-1"
          trackComponentName="GetStartedPricingPlan"
        >
          Read more
        </Button>
        about the {title} tier
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
}

GetStartedPricingPlan.defaultProps = {
}

export default GetStartedPricingPlan
