import React from 'react'
import PricingPageSpendCircle from '@/landing/PricingPageSpendCircle'

export default function PricingPageSpendCircles({
  amount,
  className,
}) {
  const [diameter, setDiameter] = React.useState(0)
  const [smallDiameter, setSmallDiameter] = React.useState(0)
  React.useEffect(() => {
    if (!diameter) return
    const area = Math.PI * (diameter / 2) ** 2
    const smallArea = area * 0.1
    const smallDiameter = ((smallArea / Math.PI) ** (1 / 2)) * 2
    setSmallDiameter(smallDiameter)
  }, [diameter])
  return (
    <>
      <PricingPageSpendCircle
        amount={amount * 0.9 * 30}
        color="redLight"
        className={className}
        diameter={diameter}
        setDiameter={setDiameter}
      />
      <PricingPageSpendCircle
        amount={amount * 0.1 * 30}
        color="green"
        diameter={smallDiameter}
      />
    </>
  )
}
