import React from 'react'
import PricingPageAdSpendCircle from '@/landing/PricingPageAdSpendCircle'
import PricingPageFeedSpendCircle from '@/landing/PricingPageFeedSpendCircle'

export default function PricingPageSpendCircles({
  monthlyBudget,
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
      <PricingPageAdSpendCircle
        amount={monthlyBudget * 0.9}
        color="redLight"
        className={[
          'col-start-5',
          'col-end-9',
          'row-start-6',
          'row-end-7',
        ].join(' ')}
        diameter={diameter}
        setDiameter={setDiameter}
      />
      <PricingPageFeedSpendCircle
        amount={monthlyBudget * 0.1}
        color="green"
        className={[
          'col-start-8',
          'col-end-12',
          'row-start-6',
          'row-end-7',
          'flex',
          'items-center',
        ].join(' ')}
        diameter={smallDiameter}
      />
    </>
  )
}
