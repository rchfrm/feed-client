import React from 'react'
import Section from '@/landing/Section'
import HeroStrapLine from '@/landing/HeroStrapLine'
import pricingPageCopy from '@/landing/copy/PricingPageCopy'
import PricingTiers from '@/landing/PricingTiers'

export default function PricingPage() {
  const {
    titlePartA,
    titlePartB,
  } = pricingPageCopy

  return (
    <Section>
      <HeroStrapLine partA={titlePartA} partB={titlePartB} />
      <PricingTiers />
    </Section>
  )
}
