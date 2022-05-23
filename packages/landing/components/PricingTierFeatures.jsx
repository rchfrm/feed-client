import PropTypes from 'prop-types'
import PricingTierFeature from '@/landing/PricingTierFeature'

export default function PricingTierFeatures({ features }) {
  return (
    <div className="pl-4">
      {features.map((feature, index) => {
        return <PricingTierFeature feature={feature} index={index} key={index} />
      })}
    </div>
  )
}

PricingTierFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
}
