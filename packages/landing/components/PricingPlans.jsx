import React from 'react'
import PricingCurrencySelect from '@/PricingCurrencySelect'
import PricingPlansWrapper from '@/landing/PricingPlansWrapper'
import MarkdownText from '@/elements/MarkdownText'
import pricingCopy from '@/landing/copy/PricingPageCopy'
import { pricingPlans } from '@/constants/pricing'

const {
  twoThousandPlus,
  footnotes,
} = pricingCopy

export default function PricingPlans() {
  const { maxSpend } = pricingPlans.find((plan) => plan.name === 'pro')
  const [currency, setCurrency] = React.useState('GBP')

  return (
    <div
      className={[
        'col-span-12',
      ].join(' ')}
    >
      <div className="mb-5">
        <PricingCurrencySelect
          currency={currency}
          setCurrency={setCurrency}
        />
      </div>
      <PricingPlansWrapper
        plans={pricingPlans}
        currency={currency}
      />
      <MarkdownText markdown={twoThousandPlus(currency, maxSpend[currency])} className="text-center my-10" />
      <MarkdownText markdown={footnotes} className="small--p mb-0" />
    </div>
  )
}
