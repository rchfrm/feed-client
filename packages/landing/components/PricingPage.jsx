import React from 'react'
import Section from '@/landing/Section'
import pricingCopy from '@/landing/copy/PricingPageCopy'
import PricingPlans from '@/landing/PricingPlans'
import MarkdownText from '@/elements/MarkdownText'

export default function PricingPage() {
  const {
    strapLine,
  } = pricingCopy

  return (
    <Section className={[
      'flex',
      'flex-col',
      'gap-y-6',
      'minContent:gap-y-8',
    ].join(' ')}
    >
      <MarkdownText
        className={[
          'text-4xl',
          'minContent:text-5xl',
          'mb-0',
          'h1',
          'md:max-w-screen-lg',
          'md:mx-auto',
        ].join(' ')}
        markdown={strapLine}
      />
      <PricingPlans />
    </Section>
  )
}
