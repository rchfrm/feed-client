import ManagedPlanHeader from '@/landing/ManagedPlanHeader'
import PricingPlanMonthlyCost from '@/landing/PricingPlanMonthlyCost'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import PricingPlanFeatures from '@/landing/PricingPlanFeatures'
import { currencies, managedPlan } from '@/constants/pricing'
import { capitalise } from '@/helpers/utils'

export default function ManagedPlan({ currency }) {
  const {
    name,
    monthlyCost,
    description,
    features,
  } = managedPlan
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
        <ManagedPlanHeader header="Expert strategy &amp; support" />
        <div className="p-5">
          <PricingPlanMonthlyCost amount={monthlyCost[currency]} currency={currency} isManaged />
          <MarkdownText markdown={`### ${capitalise(name)} service`} />
          <MarkdownText markdown={description} className="small--p sm:text-base" />
          <Button
            trackComponentName="ManagedPlan"
            version="text"
            className={[
              'flex',
              'justify-end',
              'w-full',
              'h-fit',
            ].join(' ')}
            href="https://meetings.hubspot.com/feed/managed"
          >
            <strong>Arrange a call to hear more -&gt;</strong>
          </Button>
          <hr className="my-5" />
          <PricingPlanFeatures features={features} />
        </div>
      </div>
    </div>
  )
}

ManagedPlan.propTypes = {
  currency: PropTypes.oneOf(currencies).isRequired,
}
