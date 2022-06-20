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
          'bg-redLight',
          'rounded-dialogue',
          'p-4',
          'text-white',
          'mb-10',
          'w-fit',
          'mx-auto',
          'text-center',
        ].join(' ')}
      >
        <h4 className="leading-tight mb-2">Pricing below applies from July 2022</h4>
        <p className="small--p mb-0">Until then, Feed's service fee is 10% of your budget.</p>
      </div>
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
