import React from 'react'
import Section from '@/landing/Section'
import HeroStrapLine from '@/landing/HeroStrapLine'
import pricingPageCopy from '@/landing/copy/PricingPageCopy'

export default function PricingPage() {
  const {
    titlePartA,
    titlePartB,
  } = pricingPageCopy

  return (
    <Section>
      <HeroStrapLine partA={titlePartA} partB={titlePartB} />
    </Section>
  )
}
