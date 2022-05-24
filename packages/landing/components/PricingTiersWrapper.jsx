import PricingTier from '@/landing/PricingTier'
import PropTypes from 'prop-types'
import SwiperBlock from '@/SwiperBlock'
import React from 'react'


export default function PricingTiersWrapper({ tiers }) {
  const growthTierIndex = tiers.findIndex(tier => tier.name === 'Growth')
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
      {tiers.map(tier => <PricingTier key={tier.name} tier={tier} />)}
    </SwiperBlock>
  )
}

PricingTiersWrapper.propTypes = {
  tiers: PropTypes.arrayOf(PropTypes.object).isRequired,
}
