import ManagedTierHeader from '@/landing/ManagedTierHeader'
import PlusIcon from '@/icons/PlusIcon'
import brandColors from '@/constants/brandColors'
import PricingTierMonthlyCost from '@/landing/PricingTierMonthlyCost'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import PricingTierFeatures from '@/landing/PricingTierFeatures'

const managedTier = {
  name: 'Managed',
  description: 'Whichever option you choose, you can also add on our “managed” service - effectively adding another person to your team.',
  monthlyCost: {
    GBP: 300,
    USD: 400,
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
    <>
      <div
        className={[
          'flex',
          'justify-center',
          'mt-10',
        ].join(' ')}
      >
        <PlusIcon fill={brandColors.green} className="w-14 h-auto" />
      </div>
      <div
        className={[
          'border-black',
          'border-3',
          'border-solid',
          'rounded-dialogue',
          '-mt-3',
        ].join(' ')}
      >
        <ManagedTierHeader header="Expert support" />
        <div className="p-5">
          <PricingTierMonthlyCost amount={monthlyCost.GBP} currency={currency} />
          <MarkdownText markdown="covering up to 3 active profiles*" />
          <MarkdownText markdown={`### ${name} service`} />
          <MarkdownText markdown={description} className="small--p" />
          <Button
            trackComponentName="ManagedTier"
            version="text"
            className={[
              'flex',
              'justify-end',
              'w-full',
              'h-fit',
            ].join(' ')}
            href="https://meetings.hubspot.com/feed-team/5-minute-call"
          >
            <strong>Arrange a call to hear more -></strong>
          </Button>
          <hr className="my-5" />
          <PricingTierFeatures features={features} />
        </div>
      </div>
    </>
  )
}

ManagedTier.propTypes = {
  currency: PropTypes.string,
}

ManagedTier.defaultProps = {
  currency: 'GBP',
}
