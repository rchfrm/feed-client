export default function PricingTierSelector({ tiers }) {
  const tierNames = tiers.map(tier => tier.name)
  return (
    <div
      className={[
        'flex',
      ].join(' ')}
    >
      {tierNames.map(name => {
        return (
          <svg key={name} width="10" height="10" viewBox="0 0 100 100">
            <circle r="50" cx="50" cy="50" />
          </svg>
        )
      })}
    </div>
  )
}
