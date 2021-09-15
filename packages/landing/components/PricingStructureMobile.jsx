import React from 'react'

import PricingTierCost from '@/PricingTierCost'


const PricingStructureMobile = ({ tier, costs }) => {
  // Only display "Get in touch" call to action on "Managed" tier
  if (tier.tierId === 'managed') {
    const value = tier.subscription
    const id = 'subscription'
    return (
      <h3 className={['mb-6', 'text-center'].join(' ')}>
        <PricingTierCost value={value} id={id} />
      </h3>
    )
  }
  // Display the breakdown of costs for "Basic" and "Full" tiers
  return (
    <div
      className={[
        'grid',
        'grid-cols-2',
        'text-center',
        'mb-4',
      ].join(' ')}
    >
      {costs.map((breakdown) => {
        const { title, breakdownId } = breakdown
        const costsCount = costs.length
        const colSpan = costsCount === 3 && breakdownId === 'minSpend'
        const value = tier[breakdownId]
        return (
          <div
            key={breakdownId}
            className={[
              'mb-4',
              colSpan ? 'col-span-2' : null,
            ].join(' ')}
          >
            <h3
              className={[
                'col-span-3',
                'h3',
                breakdownId === 'minSpend' ? 'text-green' : null,
                breakdownId === 'minSpend' ? 'strong' : null,
              ].join(' ')}
            >
              <PricingTierCost value={value} id={breakdownId} />
            </h3>
            <p className={['em', 'text-xs', 'pt-1'].join(' ')}>{title}</p>
          </div>
        )
      })}
    </div>
  )
}

export default PricingStructureMobile
