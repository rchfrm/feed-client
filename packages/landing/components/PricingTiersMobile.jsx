import PricingTierMobile from '@/PricingTierMobile'

const placeInLowestTier = (functions, tierId) => {
  return functions.reduce((acc, cur) => {
    const isInBasic = !!cur.applicableTiers.find(tier => tier === 'basic')
    const isInFull = !!cur.applicableTiers.find(tier => tier === 'full')
    const isInManaged = !!cur.applicableTiers.find(tier => tier === 'managed')
    if (tierId === 'basic' && isInBasic) return [...acc, cur]
    if (tierId === 'full' && isInFull && !isInBasic) return [...acc, cur]
    if (tierId === 'managed' && isInManaged && !isInBasic && !isInFull) return [...acc, cur]
    return [...acc]
  }, [])
}

const PricingTiersMobile = ({ pageData }) => {
  const { tiers: pricingTiers, pricingStructure, adNetworks, functions } = pageData
  return (
    <div className="mt-10 w-full">
      {pricingTiers.map(tier => {
        const { tierId } = tier
        const tierFunctions = placeInLowestTier(functions, tierId)
        const tierAdNetworks = placeInLowestTier(adNetworks, tierId)
        return (
          <PricingTierMobile
            key={tierId}
            tier={tier}
            structure={pricingStructure}
            adNetworks={tierAdNetworks}
            functions={tierFunctions}
          />
        )
      })}
    </div>
  )
}

export default PricingTiersMobile
