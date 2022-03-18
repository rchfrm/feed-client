import React from 'react'
import Section from '@/landing/Section'
import HeroStrapLine from '@/landing/HeroStrapLine'
import MarkdownText from '@/elements/MarkdownText'
import pricingPageCopy from '@/landing/copy/PricingPageCopy'
import Input from '@/elements/Input'
import PricingPageSpendCircles from '@/landing/PricingPageSpendCircles'

export default function PricingPage() {
  const [dailyBudget, setDailyBudget] = React.useState(5)
  const handleChange = e => {
    const { target: { value } } = e
    if (value < 0) return
    const numberValue = Math.round(Number(value))
    setDailyBudget(numberValue)
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
      <MarkdownText
        className={[
          'col-start-1',
          'col-span-12',
          'sm:col-start-2',
          'sm:col-span-11',
          'lg:col-start-3',
          'lg:col-span-10',
          'h4',
          'pb-10',
        ].join(' ')}
        markdown={bullets}
      />
      <MarkdownText
        className={[
          'col-start-1',
          'col-span-12',
          'sm:col-start-3',
          'sm:col-span-8',
          'lg:col-start-4',
          'lg:col-span-6',
        ].join(' ')}
        markdown={budgetInput}
      />
      <Input
        className={[
          'col-start-1',
          'col-span-12',
          'sm:col-start-3',
          'sm:col-span-8',
          'lg:col-start-4',
          'lg:col-span-6',
        ].join(' ')}
        name="budget"
        value={dailyBudget}
        handleChange={handleChange}
        type="number"
        prefix="£"
      />
      <MarkdownText
        className={[
          'h2',
          'font-normal',
          'col-start-1',
          'col-span-12',
          'sm:col-start-3',
          'sm:col-span-8',
          'lg:col-start-4',
          'lg:col-span-6',
        ].join(' ')}
        markdown={`Each month you will spend <strong>£${dailyBudget * 30}</strong> in total:`}
      />
      <PricingPageSpendCircles
        monthlyBudget={dailyBudget * 30}
      />
    </Section>
  )
}
