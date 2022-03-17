import React from 'react'
import PricingPageAdSpendCircle from '@/landing/PricingPageAdSpendCircle'

export default function PricingPageSpendCircles({
  amount,
  className,
}) {
  const [diameter, setDiameter] = React.useState(0)
  return (
    <PricingPageAdSpendCircle
      amount={amount}
      color="redLight"
      className={className}
      diameter={diameter}
      setDiameter={setDiameter}
    />
  )
}
