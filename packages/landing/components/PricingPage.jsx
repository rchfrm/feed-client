import React from 'react'
import Section from '@/landing/Section'
import HeroStrapLine from '@/landing/HeroStrapLine'
import MarkdownText from '@/elements/MarkdownText'
import pricingPageCopy from '@/landing/copy/PricingPageCopy'

export default function PricingPage() {
  const pageTitle = (
    <MarkdownText
      className={[
        'border-b-3',
        'border-green',
        'border-solid',
        'inline-block',
      ].join(' ')}
      markdown={pricingPageCopy.title}
    />
  )
  return (
    <Section>
      <HeroStrapLine partA={pageTitle} />
    </Section>
  )
}
