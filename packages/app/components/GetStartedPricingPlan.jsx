import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import PlusCircleIcon from '@/icons/PlusCircleIcon'

import { formatCurrency, capitalise } from '@/helpers/utils'

const GetStartedPricingPlan = ({
  plan,
  isAnnualPricing,
  setSelectedPricingPlan,
  currency,
  isRecommended,
}) => {
  const { name, description, monthlyCost, serviceFeePercentage } = plan
  const title = capitalise(name)
  const amount = monthlyCost[currency]

  return (
    <div
      key={name}
      className={[
        'w-1/3 flex flex-column',
        'mx-2 p-6',
        'text-left font-bold',
        'border-solid rounded-dialogue',
        isRecommended ? 'border-[5px] border-insta' : 'border-3 border-black',
      ].join(' ')}
    >
      <p className="text-4xl">{title}</p>
      <p className="font-normal">{description}</p>
      <div className={[
        'flex items-center mb-5',
        amount > 0 ? 'text-black' : 'text-grey-3',
      ].join(' ')}
      >
        {isAnnualPricing && amount > 0 && (
          <p className="self-start line-through text-grey-3">{amount}</p>
        )}
        <span className={[
          'mr-2 text-[80px]',
          isAnnualPricing && amount > 0 ? 'text-green' : null,
        ].join(' ')}
        >
          {formatCurrency(isAnnualPricing ? amount * 0.8 : amount, currency, true)}
        </span>
        <span className="font-normal">per month</span>
      </div>
      <div className="flex items-center text-grey-3 mb-5 font-normal">
        <span className="font-bold text-3xl">{serviceFeePercentage * 100}</span>
        <span className="text-xl mr-2">%</span>
        service fee
      </div>
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
          onClick={() => console.log('Open side-panel')}
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
  isAnnualPricing: PropTypes.bool.isRequired,
  setSelectedPricingPlan: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  isRecommended: PropTypes.bool.isRequired,
}

GetStartedPricingPlan.defaultProps = {
}

export default GetStartedPricingPlan
