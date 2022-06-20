import ManagedTier from '@/landing/ManagedTier'
import PricingTiersWrapper from '@/landing/PricingTiersWrapper'
import PricingPeriodToggle from '@/landing/PricingPeriodToggle'
import React from 'react'
import PricingCurrencySelect from '@/landing/PricingCurrencySelect'
import MarkdownText from '@/elements/MarkdownText'
import { pricingCopy } from '@/landing/copy/PricingPageCopy'

const {
  twoThousandPlus,
  footnotes,
  pricingTiers,
} = pricingCopy

export default function PricingTiers() {
  const { maxSpendMultiple, monthlyCost } = pricingTiers.find(tier => tier.name === 'Pro')
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
          'grid',
          'gap-x-2',
          'mb-5',
          'items-center',
        ].join(' ')}
        style={{
          gridTemplateColumns: '80px 1fr auto 1fr 80px',
        }}
      >
        <PricingCurrencySelect currency={currency} setCurrency={setCurrency} />
        <PricingPeriodToggle showAnnualPricing={showAnnualPricing} setShowAnnualPricing={setShowAnnualPricing} />
      </div>
      <PricingTiersWrapper tiers={pricingTiers} showAnnualPricing={showAnnualPricing} currency={currency} />
      <ManagedTier currency={currency} />
      <MarkdownText markdown={twoThousandPlus(currency, maxSpend)} className="text-center mb-10" />
      <MarkdownText markdown={footnotes} className="small--p mb-0" />
    </div>
  )
}
