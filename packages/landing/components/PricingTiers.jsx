import PricingTier from '@/landing/PricingTier'

const pricingTiers = [
  {
    name: 'Basic',
    description: 'Audience growth for beginners. Suitable for any level of budget.',
    monthlyCost: {
      GBP: 0,
      USD: 0,
    },
    serviceFeePercentage: 0.1,
    features: [
      'Promote on Facebook & Instagram',
    ],
  },
  {
    name: 'Growth',
    description: 'Extra features to step up your growth and manage multiple accounts.',
    monthlyCost: {
      GBP: 25,
      USD: 30,
    },
    serviceFeePercentage: 0,
    features: [
      'Everything in *Basic* plus...',
    ],
  },
  {
    name: 'Pro',
    description: 'For pro marketers & those ready to sell to their audience via conversion ads.',
    monthlyCost: {
      GBP: 50,
      USD: 60,
    },
    serviceFeePercentage: 0,
    features: [
      'Everything in *Growth* plus...',
    ],
  },
]

export default function PricingTiers() {
  return (
    <div
      className={[
        'col-span-12',
      ].join(' ')}
    >
      {pricingTiers.map(tier => <PricingTier key={tier.name} tier={tier} />)}
    </div>
  )
}
