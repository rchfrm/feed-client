import PropTypes from 'prop-types'
import PricingStructureMobile from '@/PricingStructureMobile'
import FeaturesMobile from '@/FeaturesMobile'


const getFeaturesTitle = (tierId) => {
  if (tierId === 'full') return 'Basic tier'
  return 'Basic and Full tiers'
}

const PricingTierMobile = ({ tier, structure, adNetworks, functions }) => {
  const { tierId, tierName } = tier
  // Remove breakdowns that are not relevant to the tier
  const costs = structure.reduce((acc, cur) => {
    const { breakdownId } = cur
    if (tier[breakdownId]) {
      return [...acc, cur]
    }
    return acc
  }, [])

  return (
    <div
      key={tierId}
      className={[
        'col-span-12',
        'border-solid',
        'border-current',
        'border-2',
        'p-5',
        'mb-8 last:mb-0',
      ].join(' ')}
    >
      <h2 className={['border-b-2', 'border-green', 'border-solid', 'mb-4', 'inline-block'].join(' ')}>{tierName}</h2>
      {/*  Pricing Structure */}
      <PricingStructureMobile tier={tier} costs={costs} />
      {tierId !== 'basic'
        ? (
          <p className={['strong', 'pb-4'].join(' ')}>
            Everything in the {getFeaturesTitle(tierId)} plus:
          </p>
        )
        : null}
      {/*  Features */}
      {tierId === 'basic'
        ? <p className={['pb-2', 'pt-8', 'strong'].join(' ')}>Features:</p>
        : null}
      <FeaturesMobile features={functions} />
      {/*  Ad Networks */}
      {adNetworks.length > 0
        ? <p className={['pb-2', 'pt-8', 'strong'].join(' ')}>Advertise on:</p>
        : null}
      <FeaturesMobile features={adNetworks} />
    </div>
  )
}

PricingTierMobile.propTypes = {
  tier: PropTypes.object.isRequired,
}

export default PricingTierMobile
