import React from 'react'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import GetStartedPricingPlan from '@/app/GetStartedPricingPlan'
import GetStartedPricingReadMore from '@/app/GetStartedPricingReadMore'

import Button from '@/elements/Button'

import { pricingPlans } from '@/constants/pricing'

const GetStartedPricingPlans = ({
  showAnnualPricing,
  currency,
  setSelectedPricingPlan,
  recommendedPlan,
}) => {
  const { setSidePanelContent, toggleSidePanel, setSidePanelButton } = React.useContext(SidePanelContext)

  const openReadMoreSidePanel = (plan) => {
    const content = <GetStartedPricingReadMore plan={plan} currency={currency} />
    const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>

    setSidePanelContent(content)
    toggleSidePanel(true)
    setSidePanelButton(button)
  }

  return (
    <div className="col-span-12 sm:mt-12 mb-10">
      <div className="grid grid-cols-12 gap-4">
        {pricingPlans.map(plan => {
          return (
            <div
              key={plan.name}
              className="col-span-12 sm:col-span-4"
            >
              <GetStartedPricingPlan
                plan={plan}
                showAnnualPricing={showAnnualPricing}
                currency={currency}
                setSelectedPricingPlan={setSelectedPricingPlan}
                handleSidePanel={openReadMoreSidePanel}
                isRecommended={plan.name === recommendedPlan}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

GetStartedPricingPlans.propTypes = {
}

GetStartedPricingPlans.defaultProps = {
}

export default GetStartedPricingPlans
