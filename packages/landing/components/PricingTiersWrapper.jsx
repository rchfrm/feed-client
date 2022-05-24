import PricingTier from '@/landing/PricingTier'
import PropTypes from 'prop-types'
import SwiperBlock from '@/SwiperBlock'
import React from 'react'
import useBreakpointTest from '@/landing/hooks/useBreakpointTest'


export default function PricingTiersWrapper({ tiers }) {
  const growthTierIndex = tiers.findIndex(tier => tier.name === 'Growth')
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
        {tiers.map(tier => {
          return (
            <div
              key={tier.name}
              className={[
                'col-span-4',
              ].join(' ')}
            >
              <PricingTier key={tier.name} tier={tier} />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <SwiperBlock
      goToSlide={growthTierIndex}
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
      {tiers.map(tier => {
        return (
          <li
            key={tier.name}
            className={[
              'swiper-slide',
              'box-border',
            ].join(' ')}
          >
            <PricingTier key={tier.name} tier={tier} />
          </li>
        )
      })}
    </SwiperBlock>
  )
}

PricingTiersWrapper.propTypes = {
  tiers: PropTypes.arrayOf(PropTypes.object).isRequired,
}
