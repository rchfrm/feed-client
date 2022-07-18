import PropTypes from 'prop-types'
import PricingPlanFeature from '@/PricingPlanFeature'

export default function PricingPlanFeatures({ features }) {
  return (
    <div className="pl-3">
      {features.map((feature, index) => {
        return <PricingPlanFeature feature={feature} index={index} key={index} />
      })}
    </div>
  )
}

PricingPlanFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
}
