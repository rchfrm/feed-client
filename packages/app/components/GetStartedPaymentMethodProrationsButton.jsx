import React from 'react'
import PropTypes from 'prop-types'
import useOpenPricingProrationsSidePanel from '@/app/hooks/useOpenPricingProrationsSidePanel'
import Button from '@/elements/Button'

const GetStartedPaymentMethodProrationsButton = ({ profilePlans, promoCode }) => {
  const openPricingProrationsSidePanel = useOpenPricingProrationsSidePanel()

  const openProrationsSidePanel = () => {
    openPricingProrationsSidePanel(profilePlans, promoCode)
  }

  return (
    <Button
      version="text"
      onClick={openProrationsSidePanel}
      trackComponentName="GetStartedPaymentMethodProrationsButton"
      className="text-sm"
    >
      View payment breakdown
    </Button>
  )
}

GetStartedPaymentMethodProrationsButton.propTypes = {
  profilePlans: PropTypes.object.isRequired,
  promoCode: PropTypes.string.isRequired,
}

export default GetStartedPaymentMethodProrationsButton
