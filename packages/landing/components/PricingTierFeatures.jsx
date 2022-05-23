import PropTypes from 'prop-types'

export default function PricingTierFeatures({ features }) {
  return features.map((feature, index) => <p key={index}>{feature}</p>)
}

PricingTierFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
}
