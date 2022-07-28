import PropTypes from 'prop-types'
import PricingPlanFeature from '@/PricingPlanFeature'

export default function PricingPlanFeatures({ features, className }) {
  return (
    <div className={['pl-3', className].join(' ')}>
      {features.map((feature, index) => {
        return <PricingPlanFeature feature={feature} index={index} key={index} />
      })}
    </div>
  )
}

PricingPlanFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
}

PricingPlanFeatures.defaultProps = {
  className: null,
}
