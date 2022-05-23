import React from 'react'
import Section from '@/landing/Section'
import HeroStrapLine from '@/landing/HeroStrapLine'
import MarkdownText from '@/elements/MarkdownText'
import pricingPageCopy from '@/landing/copy/PricingPageCopy'
import Input from '@/elements/Input'
import { formatCurrency } from '@/landing/helpers/utils'

export default function PricingPage() {
  const [period, setPeriod] = React.useState('monthly')

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
