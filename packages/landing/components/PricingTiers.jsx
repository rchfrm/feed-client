import ManagedTier from '@/landing/ManagedTier'
import PricingTiersWrapper from '@/landing/PricingTiersWrapper'
import PricingPeriodToggle from '@/landing/PricingPeriodToggle'
import React from 'react'
import PricingCurrencySelect from '@/landing/PricingCurrencySelect'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/landing/copy/PricingPageCopy'

const pricingTiers = [
  {
    name: 'Basic',
    description: 'Audience growth for beginners. Suitable for any level of budget.',
    monthlyCost: {
      GBP: 0,
      USD: 0,
      EUR: 0,
      CAD: 0,
      AUD: 0,
      NOK: 0,
      MXN: 0,
      SEK: 0,
    },
    serviceFeePercentage: 0.1,
    features: [
      'Promote on Facebook & Instagram',
      'Lookalikes and retargeting',
      '100% automated campaign setup',
      'Audience growth objectives',
      'Promote posts and stories',
      'Continuous A/B testing',
      'One user and one profile*',
      'Organic insights & benchmarks',
    ],
  },
  {
    name: 'Growth',
    description: 'Extra features to step up your growth and manage multiple accounts.',
    monthlyCost: {
      GBP: 25,
      USD: 30,
      EUR: 30,
      CAD: 40,
      AUD: 45,
      NOK: 300,
      MXN: 600,
      SEK: 300,
    },
    serviceFeePercentage: 0,
    features: [
      'Everything in **Basic** plus...',
      'Connect unlimited profiles^',
      'Growth and website view objectives',
      'Custom targeting locations',
      'Prioritise a post for instant promotion',
      'Edit individual ad text, links and CTA',
      'Override automated post selection',
      '£500 max monthly spend per profile^',
    ],
  },
  {
    name: 'Pro',
    description: 'For pro marketers & those ready to sell to their audience via conversion ads.',
    monthlyCost: {
      GBP: 50,
      USD: 60,
      EUR: 60,
      CAD: 80,
      AUD: 90,
      NOK: 600,
      MXN: 1200,
      SEK: 600,
    },
    serviceFeePercentage: 0,
    features: [
      'Everything in **Growth** plus...',
      'Run sales ads (conversion ads)',
      'Meta pixel based retargeting',
      'Multiple objectives°',
      'Clear reporting on return from ad spend',
      '£2,000 max monthly spend per profile^',
    ],
  },
]

const {
  twoThousandPlus,
  footnotes,
} = copy

export default function PricingTiers() {
  const [showAnnualPricing, setShowAnnualPricing] = React.useState(false)
  const [currency, setCurrency] = React.useState('GBP')
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
