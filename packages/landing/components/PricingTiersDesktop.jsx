import React from 'react'

import PricingTierDesktopDetails from '@/PricingTierDesktopDetails'
import PricingTierCost from '@/PricingTierCost'

const MANAGED_TIER = ({ tiers }) => {
  const managed = tiers.find(el => el.tierId === 'managed')
  const value = managed.subscription
  const id = 'subscription'
  return (
    <div
      className={[
        'row-span-4',
        'col-span-3',
        'self-center',
        'h3',
      ].join(' ')}
    >
      <PricingTierCost value={value} id={id} />
    </div>
  )
}

const PricingTiersDesktop = ({ pageData }) => {
  const { tiers: pricingTiers, pricingStructure, adNetworks, functions } = pageData
  return (
    <div className={[
      'grid col-span-12 grid-cols-12 gap-4',
      'section--padding',
      'text-center',
    ].join(' ')}
    >
      {/*  Name of each tier */}
      {pricingTiers.map((tier, index) => {
        return (
          <div
            key={index}
            className={[
              'col-span-4',
              'pb-4',
              'grid',
              'justify-center',
              index === 0 ? 'col-start-5' : null,
            ].join(' ')}
          >
            <h2 className={['border-b-2', 'border-green', 'border-solid'].join(' ')}>{tier.tierName}</h2>
          </div>
        )
      })}

      {/*<MANAGED_TIER tiers={pricingTiers} />*/}

      {/*  Pricing structure for each tier */}
      <PricingTierDesktopDetails headers={pricingStructure} tiers={pricingTiers} pricing />

      {/*  Ad networks */}
      <p className={['col-span-12', 'font-bold', 'text-left', 'pt-16'].join(' ')}>Ad networks:</p>
      <PricingTierDesktopDetails headers={adNetworks} tiers={pricingTiers} />

      <p className={['col-span-12', 'font-bold', 'text-left', 'pt-16'].join(' ')}>Features:</p>
      {/*  List of functions */}
      <PricingTierDesktopDetails headers={functions} tiers={pricingTiers} />

    </div>
  )
}

export default PricingTiersDesktop
