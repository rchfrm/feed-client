import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/landing/hooks/useBreakpointTest'

import PricingPlan from '@/landing/PricingPlan'
import SwiperBlock from '@/SwiperBlock'

import { currencies } from '@/constants/pricing'

export default function PricingPlansWrapper({
  plans,
  currency,
}) {
  const growthPlanIndex = plans.findIndex((plan) => plan.name === 'growth')
  const isDesktop = useBreakpointTest('sm')

  if (isDesktop) {
    return (
      <div
        className={[
          'grid',
          'grid-cols-12',
          'gap-4',
        ].join(' ')}
      >
        {plans.map((plan) => {
          return (
            <div
              key={plan.name}
              className={[
                'col-span-4',
              ].join(' ')}
            >
              <PricingPlan
                plan={plan}
                currency={currency}
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
      {plans.map((plan) => {
        return (
          <li
            key={plan.name}
            className={[
              'swiper-slide',
              'box-border',
            ].join(' ')}
          >
            <PricingPlan
              plan={plan}
              currency={currency}
            />
          </li>
        )
      })}
    </SwiperBlock>
  )
}

PricingPlansWrapper.propTypes = {
  plans: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.oneOf(currencies).isRequired,
}

PricingPlansWrapper.defaultProps = {
}
