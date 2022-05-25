import ManagedTierHeader from '@/landing/ManagedTierHeader'
import PlusIcon from '@/icons/PlusIcon'
import brandColors from '@/constants/brandColors'
import PricingTierMonthlyCost from '@/landing/PricingTierMonthlyCost'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import PricingTierFeatures from '@/landing/PricingTierFeatures'
import copy from '@/landing/copy/PricingPageCopy'

const {
  currencyOptions,
} = copy

const managedTier = {
  name: 'Managed',
  description: 'Whichever option you choose, you can also add on our “managed” service - effectively adding another person to your team.',
  monthlyCost: {
    GBP: 300,
    USD: 400,
    EUR: 400,
    CAD: 500,
    AUD: 500,
    NOK: 4000,
    MXN: 7000,
    SEK: 4000,
  },
  serviceFeePercentage: 0,
  features: [
    'Regular strategy and insight calls',
    'Set-up support &amp; ongoing management of Feed ads',
    'Maximise your results &amp; what you’re learning ',
    'Dedicated account manager',
  ],
}

export default function ManagedTier({ currency }) {
  const {
    name,
    monthlyCost,
    description,
    features,
  } = managedTier
  return (
    <div
      className={[
        'sm:grid',
        'sm:grid-cols-12',
        'mb-10',
      ].join(' ')}
    >
      <div
        className={[
          'flex',
          'justify-center',
          'mt-5',
          'sm:col-span-12',
        ].join(' ')}
      >
        <PlusIcon fill={brandColors.green} className="w-14 h-14 z-40" />
      </div>
      <div
        className={[
          'border-black',
          'border-3',
          'border-solid',
          'rounded-dialogue',
          '-mt-3',
          'sm:col-span-6',
          'sm:col-start-4',
        ].join(' ')}
      >
        <ManagedTierHeader header="Expert support" />
        <div className="p-5">
          <PricingTierMonthlyCost amount={monthlyCost[currency]} currency={currency} isManaged />
          <MarkdownText markdown="covering up to 3 active profiles*" />
          <MarkdownText markdown={`### ${name} service`} />
          <MarkdownText markdown={description} className="small--p sm:text-base" />
          <Button
            trackComponentName="ManagedTier"
            version="text"
            className={[
              'flex',
              'justify-end',
              'w-full',
              'h-fit',
            ].join(' ')}
            href="https://meetings.hubspot.com/feed/managed"
          >
            <strong>Arrange a call to hear more -></strong>
          </Button>
          <hr className="my-5" />
          <PricingTierFeatures features={features} />
        </div>
      </div>
    </div>
  )
}

ManagedTier.propTypes = {
  currency: PropTypes.oneOf(currencyOptions).isRequired,
}
