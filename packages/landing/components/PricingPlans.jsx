import React from 'react'

import useBreakpointTest from '@/landing/hooks/useBreakpointTest'

import ManagedPlan from '@/landing/ManagedPlan'
import PricingPlansHeader from '@/PricingPlansHeader'
import PricingPlansWrapper from '@/PricingPlansWrapper'
import PricingPlan from '@/landing/PricingPlan'

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
  const isDesktop = useBreakpointTest('sm')

  React.useEffect(() => {
    setMaxSpend(monthlyCost[currency] * maxSpendMultiple)
  }, [currency, maxSpendMultiple, monthlyCost])
  return (
    <div
      className={[
        'col-span-12',
      ].join(' ')}
    >
      <PricingPlansHeader
        currency={currency}
        setCurrency={setCurrency}
        showAnnualPricing={showAnnualPricing}
        setShowAnnualPricing={setShowAnnualPricing}
        buttonPillClassName="bg-insta border-insta"
      />
      <PricingPlansWrapper
        plans={pricingPlans}
        showAnnualPricing={showAnnualPricing}
        currency={currency}
        pricingPlanComponent={PricingPlan}
        isDesktop={isDesktop}
      />
      <ManagedPlan currency={currency} />
      <MarkdownText markdown={twoThousandPlus(currency, maxSpend)} className="text-center mb-10" />
      <MarkdownText markdown={footnotes} className="small--p mb-0" />
    </div>
  )
}
