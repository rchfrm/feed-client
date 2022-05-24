import PricingTier from '@/landing/PricingTier'
import PricingTierSelector from '@/landing/PricingTierSelector'
import ManagedTier from '@/landing/ManagedTier'
import PricingTiersWrapper from '@/landing/PricingTiersWrapper'

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
    },
    serviceFeePercentage: 0,
    features: [
      'Everything in **Basic** plus...',
      'Connect unlimited profiles*',
      'Growth and website view objectives',
      'Custom targeting locations',
      'Prioritise a post for instant promotion',
      'Edit individual ad text, links and CTA',
      'Override automated post selection',
      '£500 max monthly spend per profile*',
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
      'Everything in **Growth** plus...',
      'Run sales ads (conversion ads)',
      'Meta pixel based retargeting',
      'Multiple objectives^',
      'Clear reporting on return from ad spend',
      '£2,000 max monthly spend per profile*',
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
      <PricingTierSelector tiers={pricingTiers} />
      <PricingTiersWrapper tiers={pricingTiers} />
      <ManagedTier />
    </div>
  )
}
