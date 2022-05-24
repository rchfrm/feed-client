import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

export default function PricingTierSelector({ tiers, selectedTier }) {
  const tierNames = tiers.map(tier => tier.name)
  return (
    <div
      className={[
        'flex',
        'mb-5',
        'justify-center',
        'gap-2',
      ].join(' ')}
    >
      {tierNames.map(name => {
        return (
          <svg
            key={name}
            width="10"
            height="10"
            viewBox="0 0 100 100"
            fill={name === selectedTier ? brandColors.black : brandColors.grey}
          >
            <circle r="50" cx="50" cy="50" />
          </svg>
        )
      })}
    </div>
  )
}

PricingTierSelector.propTypes = {
  tiers: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTier: PropTypes.string,
}

PricingTierSelector.defaultProps = {
  selectedTier: 'Growth',
}
