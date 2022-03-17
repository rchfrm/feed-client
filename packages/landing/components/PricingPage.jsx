import React from 'react'
import Section from '@/landing/Section'
import HeroStrapLine from '@/landing/HeroStrapLine'
import MarkdownText from '@/elements/MarkdownText'
import pricingPageCopy from '@/landing/copy/PricingPageCopy'
import Input from '@/elements/Input'

export default function PricingPage() {
  const [budget, setBudget] = React.useState(5)
  const handleChange = e => {
    const { target: { value } } = e
    if (value < 0) return
    setBudget(e.target.value)
  }

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
      <Input
        className={['col-start-4', 'col-span-6'].join(' ')}
        name="budget"
        value={budget}
        handleChange={handleChange}
        type="number"
        prefix="£"
      />
    </Section>
  )
}
