import React from 'react'

import ManagedPlan from '@/landing/ManagedPlan'
import PricingPeriodToggle from '@/PricingPeriodToggle'
import PricingCurrencySelect from '@/PricingCurrencySelect'
import PricingPlansWrapper from '@/landing/PricingPlansWrapper'

import MarkdownText from '@/elements/MarkdownText'

import { pricingCopy } from '@/landing/copy/PricingPageCopy'
import { pricingPlans } from '@/constants/pricing'

const {
  twoThousandPlus,
  footnotes,
} = pricingCopy

export default function PricingPlans() {
  const { maxSpendMultiple, monthlyCost } = pricingPlans.find(plan => plan.name === 'pro')
  const [showAnnualPricing, setShowAnnualPricing] = React.useState(false)
  const [currency, setCurrency] = React.useState('GBP')
  const [maxSpend, setMaxSpend] = React.useState(monthlyCost[currency] * maxSpendMultiple)

  React.useEffect(() => {
    setMaxSpend(monthlyCost[currency] * maxSpendMultiple)
  }, [currency, maxSpendMultiple, monthlyCost])
  return (
    <div
      className={[
        'col-span-12',
      ].join(' ')}
    >
      <div
        className={[
          'flex flex-column xs:flex-row sm:items-center xs:justify-between',
          "after:content-[''] after:flex-1",
          'mb-5',
        ].join(' ')}
      >
        <div className="flex flex-1 mb-2 xs:mb-0">
          <PricingCurrencySelect
            currency={currency}
            setCurrency={setCurrency}
            className="xs:ml-2 w-[75px]"
          />
        </div>
        <PricingPeriodToggle
          showAnnualPricing={showAnnualPricing}
          setShowAnnualPricing={setShowAnnualPricing}
          className="flex items-center"
          buttonPillClassName="bg-insta border-insta"
        />
      </div>
      <PricingPlansWrapper
        plans={pricingPlans}
        showAnnualPricing={showAnnualPricing}
        currency={currency}
      />
      <ManagedPlan currency={currency} />
      <MarkdownText markdown={twoThousandPlus(currency, maxSpend)} className="text-center mb-10" />
      <MarkdownText markdown={footnotes} className="small--p mb-0" />
    </div>
  )
}
