import React from 'react'
import PricingPageAdSpendCircle from '@/landing/PricingPageAdSpendCircle'
import PricingPageFeedSpendCircle from '@/landing/PricingPageFeedSpendCircle'
import PropTypes from 'prop-types'

export default function PricingPageSpendCircles({
  monthlyBudget,
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
          'col-start-1',
          'col-end-13',
          'xs:col-start-2',
          'xs:col-end-12',
          'sm:col-start-4',
          'sm:col-end-10',
          'lg:col-start-5',
          'lg:col-end-9',
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
          'items-end',
          'col-start-1',
          'col-end-13',
          'sm:col-start-8',
          'sm:col-end-13',
          'row-start-6',
          'row-end-7',
          'flex',
          'sm:items-start',
        ].join(' ')}
        diameter={smallDiameter}
      />
    </>
  )
}

PricingPageSpendCircles.propTypes = {
  monthlyBudget: PropTypes.number.isRequired,
}
