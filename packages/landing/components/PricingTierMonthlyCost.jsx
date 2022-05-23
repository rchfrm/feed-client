import PropTypes from 'prop-types'

export default function PricingTierMonthlyCost({ amount }) {
  return (
    <p>{amount}</p>
  )
}

PricingTierMonthlyCost.propTypes = {
  amount: PropTypes.number.isRequired,
}
