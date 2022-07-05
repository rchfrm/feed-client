import React from 'react'
import PropTypes from 'prop-types'

import SwiperBlock from '@/SwiperBlock'

import { currencies } from '@/constants/pricing'

export default function PricingPlansWrapper({
  plans,
  showAnnualPricing,
  currency,
  pricingPlanComponent,
  isDesktop,
  setSelectedPricingPlan,
  recommendedPlan,
  className,
}) {
  const growthPlanIndex = plans.findIndex(plan => plan.name === 'growth')
  const PricingPlanComponent = pricingPlanComponent

  if (isDesktop) {
    return (
      <div
        className={[
          'grid',
          'grid-cols-12',
          'gap-4',
          className,
        ].join(' ')}
      >
        {plans.map(plan => {
          return (
            <div
              key={plan.name}
              className={[
                'col-span-4',
              ].join(' ')}
            >
              <PricingPlanComponent
                plan={plan}
                showAnnualPricing={showAnnualPricing}
                currency={currency}
                setSelectedPricingPlan={setSelectedPricingPlan}
                isRecommended={plan.name === recommendedPlan}
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <SwiperBlock
      goToSlide={growthPlanIndex}
      pagination
      paginationPosition="top"
      paginationClass={[
        'flex',
        'w-full',
        'justify-center',
        'relative',
        'mb-5',
      ].join(' ')}
      config={{
        spaceBetween: 20,
      }}
    >
      {plans.map(plan => {
        return (
          <li
            key={plan.name}
            className={[
              'swiper-slide',
              'box-border',
            ].join(' ')}
          >
            <PricingPlanComponent
              plan={plan}
              showAnnualPricing={showAnnualPricing}
              currency={currency}
              setSelectedPricingPlan={setSelectedPricingPlan}
              isRecommended={plan.name === recommendedPlan}
            />
          </li>
        )
      })}
    </SwiperBlock>
  )
}

PricingPlansWrapper.propTypes = {
  plans: PropTypes.arrayOf(PropTypes.object).isRequired,
  showAnnualPricing: PropTypes.bool.isRequired,
  currency: PropTypes.oneOf(currencies).isRequired,
  pricingPlanComponent: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  setSelectedPricingPlan: PropTypes.func,
  recommendedPlan: PropTypes.string,
  className: PropTypes.string,
}

PricingPlansWrapper.defaultProps = {
  setSelectedPricingPlan: () => {},
  recommendedPlan: '',
  className: null,
}

