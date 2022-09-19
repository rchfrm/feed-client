import React from 'react'
import Section from '@/landing/Section'
import HeroStrapLine from '@/landing/HeroStrapLine'
import pricingCopy from '@/landing/copy/PricingPageCopy'
import PricingPlans from '@/landing/PricingPlans'

export default function PricingPage() {
  const {
    strapLine,
  } = pricingCopy

  return (
    <Section>
      <div
        className={[
          'pb-[60px]',
          'sm:grid',
          'sm:grid-cols-12',
          'sm:gap-x-4',
        ].join(' ')}
      >
        <HeroStrapLine strapLine={strapLine} />
      </div>
      <PricingPlans />
    </Section>
  )
}
