import React from 'react'
import Section from '@/landing/Section'
import HeroStrapLine from '@/landing/HeroStrapLine'
import MarkdownText from '@/elements/MarkdownText'
import pricingPageCopy from '@/landing/copy/PricingPageCopy'

export default function PricingPage() {
  const {
    title,
    bullets,
    budgetInput,
  } = pricingPageCopy
  const pageTitle = (
    <MarkdownText
      className={[
        'border-b-3',
        'border-green',
        'border-solid',
        'inline-block',
      ].join(' ')}
      markdown={title}
    />
  )
  return (
    <Section>
      <HeroStrapLine partA={pageTitle} />
      <MarkdownText className={['col-start-3', 'col-span-10', 'h4', 'pb-10'].join(' ')} markdown={bullets} />
      <MarkdownText className={['col-start-4', 'col-span-6'].join(' ')} markdown={budgetInput} />
    </Section>
  )
}
