import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import GetStartedPricingPlanMonthlyCost from '@/app/GetStartedPricingPlanMonthlyCost'
import GetStartedPricingPlanServiceFee from '@/app/GetStartedPricingPlanServiceFee'
import GetStartedPricingPlanRecommendation from '@/app/GetStartedPricingPlanRecommendation'
import GetStartedPricingPlanSelectButton from '@/app/GetStartedPricingPlanSelectButton'
import GetStartedPricingPlanReadMoreButton from '@/app/GetStartedPricingPlanReadMoreButton'

import MarkdownText from '@/elements/MarkdownText'

import { capitalise } from '@/helpers/utils'

const GetStartedPricingPlan = ({
  plan,
  showAnnualPricing,
  setSelectedPricingPlan,
  handleSidePanel,
  currency,
  isRecommended,
  isDisabled,
}) => {
  const {
    name,
    description,
    monthlyCost,
    serviceFeePercentage,
  } = plan

  const isDesktop = useBreakpointTest('sm')

  return (
    <div
      className={[
        'w-full sm:h-full relative',
        'flex flex-row items-center justify-between sm:block',
        'py-2 px-3 xs:py-3 sm:p-6',
        'mb-6 sm:mb-0',
        !isDesktop && isRecommended ? 'pb-12 xs:pb-12' : null,
        'border-solid rounded-dialogue',
        isRecommended ? 'border-[5px] border-insta' : 'border-3 border-black',
      ].join(' ')}
    >
      {isRecommended && (
        <GetStartedPricingPlanRecommendation />
      )}
      <h2 className="mb-0 sm:mb-5 text-2xl sm:text-3xl">{capitalise(name)}</h2>
      <MarkdownText
        markdown={description}
        className={[
          'hidden sm:block',
          'small--p',
          'sm:text-base',
          'xxs:min-h-2-lines',
          'xxs:mb-0',
          'xs:min-h-fit',
          'xs:mb-5',
          'sm:min-h-4-lines',
          'sm:mb-0',
          'md:min-h-3-lines',
          'xl:min-h-fit',
          'lg:mb-5',
        ].join(' ')}
      />
      <div className="flex flex-row sm:flex-col">
        <GetStartedPricingPlanMonthlyCost
          amount={monthlyCost[currency]}
          showAnnualPricing={showAnnualPricing}
          currency={currency}
        />
        <GetStartedPricingPlanServiceFee
          percentage={serviceFeePercentage}
          plan={plan}
        />
      </div>
      <GetStartedPricingPlanSelectButton
        setSelectedPricingPlan={setSelectedPricingPlan}
        plan={plan}
        isDisabled={isDisabled}
      />
      <GetStartedPricingPlanReadMoreButton
        plan={plan}
        handleSidePanel={handleSidePanel}
      />
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
  isDisabled: PropTypes.bool,
}

GetStartedPricingPlan.defaultProps = {
  isDisabled: false,
}

export default GetStartedPricingPlan
