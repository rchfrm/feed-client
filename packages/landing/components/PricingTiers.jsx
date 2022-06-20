import ManagedTier from '@/landing/ManagedTier'
import PricingTiersWrapper from '@/landing/PricingTiersWrapper'
import PricingPeriodToggle from '@/landing/PricingPeriodToggle'
import React from 'react'
import PricingCurrencySelect from '@/landing/PricingCurrencySelect'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/landing/copy/PricingPageCopy'

const {
  twoThousandPlus,
  footnotes,
} = copy

export default function PricingTiers() {
  const [showAnnualPricing, setShowAnnualPricing] = React.useState(false)
  const [currency, setCurrency] = React.useState('GBP')
  const { pricingTiers } = copy
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
      <MarkdownText markdown={twoThousandPlus} className="text-center mb-10" />
      <MarkdownText markdown={footnotes} className="small--p mb-0" />
    </div>
  )
}
