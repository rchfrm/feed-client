import ManagedTierHeader from '@/landing/ManagedTierHeader'
import PricingTierMonthlyCost from '@/landing/PricingTierMonthlyCost'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import PricingTierFeatures from '@/landing/PricingTierFeatures'
import { pricingCopy } from '@/landing/copy/PricingPageCopy'
import { currencies } from '@/constants/pricing'

const { managedTier } = pricingCopy

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
        'my-10',
      ].join(' ')}
    >
      <div
        className={[
          'border-black',
          'border-3',
          'border-solid',
          'rounded-dialogue',
          'sm:col-span-6',
          'sm:col-start-4',
        ].join(' ')}
      >
        <ManagedTierHeader header="Expert strategy &amp; support" />
        <div className="p-5">
          <PricingTierMonthlyCost amount={monthlyCost[currency]} currency={currency} isManaged />
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
  currency: PropTypes.oneOf(currencies).isRequired,
}
