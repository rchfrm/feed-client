
import PropTypes from 'prop-types'

import PricingPlanMonthlyCost from '@/PricingPlanMonthlyCost'
import PricingPlanServiceFee from '@/PricingPlanServiceFee'

import MarkdownText from '@/elements/MarkdownText'

import { capitalise } from '@/helpers/utils'

const PricingPlanTopSection = ({ plan, currency, showAnnualPricing }) => {
  const {
    name,
    description,
    monthlyCost,
    serviceFeePercentage,
  } = plan

  return (
    <>
      <h2>{capitalise(name)}</h2>
      <MarkdownText
        markdown={description}
        className={[
          'small--p',
          'sm:text-base',
          'xxs:min-h-2-lines',
          'xxs:mb-0',
          'xs:min-h-fit',
          'xs:mb-5',
          'sm:min-h-4-lines',
          'sm:mb-0',
          'md:min-h-3-lines',
          'lg:min-h-fit',
          'lg:mb-5',
        ].join(' ')}
      />
      <PricingPlanMonthlyCost amount={monthlyCost[currency]} showAnnualPricing={showAnnualPricing} currency={currency} />
      <PricingPlanServiceFee percentage={serviceFeePercentage} />
    </>
  )
}

PricingPlanTopSection.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    monthlyCost: PropTypes.objectOf(PropTypes.number),
    serviceFeePercentage: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.string),
    maxSpendMultiple: PropTypes.number,
  }).isRequired,
  currency: PropTypes.string.isRequired,
  showAnnualPricing: PropTypes.bool.isRequired,
}

export default PricingPlanTopSection
