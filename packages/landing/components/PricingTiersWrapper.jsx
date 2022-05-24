import PricingTier from '@/landing/PricingTier'
import PropTypes from 'prop-types'

export default function PricingTiersWrapper({ tiers }) {
  return (
    <div
      className={[
        'flex',
        'gap-5',
      ].join(' ')}
    >
      {tiers.map(tier => <PricingTier key={tier.name} tier={tier} />)}
    </div>
  )
}

PricingTiersWrapper.propTypes = {
  tiers: PropTypes.arrayOf(PropTypes.object).isRequired,
}
