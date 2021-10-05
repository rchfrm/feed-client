import React from 'react'
import PropTypes from 'prop-types'

import Anchor from '@/landing/elements/Anchor'

const PricingTierCost = ({ value, id }) => {
  // NO VALUE
  if (!value) return 'na.'
  // MIN SPEND
  if (id === 'minSpend') return `£${value}`
  // SUBSCRIPTION
  if (id === 'subscription') {
    return (
      <Anchor
        className={[
          'text-fb',
          'underline',
          'strong',
        ].join(' ')}
        href="mailto:team@tryfeed.co"
      >
        {value}
      </Anchor>
    )
  }
  // DEFAULT
  return `${value * 100}%`
}

PricingTierCost.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  id: PropTypes.string,
}

PricingTierCost.defaultProps = {
  value: '',
  id: '',
}


export default PricingTierCost
