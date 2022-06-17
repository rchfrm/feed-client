import PropTypes from 'prop-types'

export default function PricingTierServiceFee({ percentage }) {
  return (
    <div
      className={[
        'flex',
        'items-center',
        percentage === 0 ? 'text-grey-3' : null,
      ].join(' ')}
    >
      <p className="h2">{percentage * 100}</p>
      <p
        className={['h4', 'pr-1'].join(' ')}
      >
        %
      </p>
      <p>service fee</p>
    </div>
  )
}

PricingTierServiceFee.propTypes = {
  percentage: PropTypes.number.isRequired,
}