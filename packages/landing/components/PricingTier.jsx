import MarkdownText from '@/elements/MarkdownText'
import PropTypes from 'prop-types'
import PricingTierMonthlyCost from '@/landing/PricingTierMonthlyCost'
import PricingTierServiceFee from '@/landing/PricingTierServiceFee'
import PricingTierFeatures from '@/landing/PricingTierFeatures'

export default function PricingTier({ tier }) {
  const {
    name,
    description,
    monthlyCost,
    serviceFeePercentage,
    features,
  } = tier
  return (
    <div key={name}>
      <h2>{name}</h2>
      <MarkdownText markdown={description} />
      <PricingTierMonthlyCost amount={monthlyCost.GBP} />
      <PricingTierServiceFee percentage={serviceFeePercentage} />
      <PricingTierFeatures features={features} />
    </div>
  )
}

PricingTier.propTypes = {
  tier: PropTypes.exact({
    name: PropTypes.string,
    description: PropTypes.string,
    monthlyCost: PropTypes.objectOf(PropTypes.number),
    serviceFeePercentage: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}
