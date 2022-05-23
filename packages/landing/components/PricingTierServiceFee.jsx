import PropTypes from 'prop-types'

export default function PricingTierServiceFee({ percentage }) {
  return (
    <p>{percentage}</p>
  )
}

PricingTierServiceFee.propTypes = {
  percentage: PropTypes.number.isRequired,
}
