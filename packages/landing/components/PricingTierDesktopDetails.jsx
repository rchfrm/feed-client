import React from 'react'
// import PropTypes from 'prop-types'

import TickIcon from '@/landing/icons/TickIcon'

import PricingTierCost from '@/landing/PricingTierCost'

const PRICING_ITEM = ({ id, tier }) => {
  const value = tier[id]
  return (
    <div
      key={id}
      className={[
        'col-span-4',
        'h3',
        id === 'minSpend' ? 'text-green' : null,
        id === 'minSpend' ? 'strong' : null,
        !tier[id] ? 'text-grey-3' : null,
      ].join(' ')}
    >
      <PricingTierCost value={value} id={id} />
    </div>
  )
}

const PRICING_STRUCTURE = ({ breakdownId, tiers }) => {
  return tiers.reduce((acc, cur, index) => {
    if (cur.tierId !== 'managed') {
      return [...acc, <PRICING_ITEM key={index} id={breakdownId} tier={cur} />]
    }
    return [...acc]
  }, [])
}


const FEATURES = ({ applicableTiers, tiers }) => {
  return tiers.map((tier, index) => {
    const includedInTier = !!applicableTiers.find(el => el === tier.tierId)
    return (
      <div
        key={index}
        className={[
          'col-span-4',
          'h3',
          'grid',
          'justify-center',
          'content-center',
        ].join(' ')}
      >
        {includedInTier ? (
          <TickIcon className={['fill-current', 'h-4', 'w-auto'].join(' ')} />
        ) : (
          '-'
        )}
      </div>
    )
  })
}

const PricingTierDesktopDetails = ({ headers, tiers, pricing }) => {
  return headers.map(({ title, breakdownId, applicableTiers }, i) => {
    return (
      <div
        key={i}
        className={[
          'grid gap-4',
          'col-span-12',
          'grid-cols-12',
          pricing && i === 0 ? 'row-start-2' : null,
          pricing && i !== headers.length - 1 ? 'border-solid border-b-2 border-grey-1 pb-6' : null,
          'mb-3 last:mb-0',
        ].join(' ')}
      >
        <h4 className={['col-span-4', 'text-left'].join(' ')}>{title}</h4>
        {breakdownId
          ? <PRICING_STRUCTURE tiers={tiers} breakdownId={breakdownId} title={title} />
          : <FEATURES tiers={tiers} applicableTiers={applicableTiers} />}
      </div>
    )
  })
}

export default PricingTierDesktopDetails
