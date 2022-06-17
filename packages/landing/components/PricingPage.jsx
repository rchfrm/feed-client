import React from 'react'
import Section from '@/landing/Section'
import HeroStrapLine from '@/landing/HeroStrapLine'
import pricingPageCopy from '@/landing/copy/PricingPageCopy'
import PricingTiers from '@/landing/PricingTiers'

export default function PricingPage() {
  const {
    strapLine,
  } = pricingPageCopy

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
      <PricingTiers />
    </Section>
  )
}
