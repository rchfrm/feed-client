import React from 'react'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useOpenPricingProrationsSidePanel from '@/app/hooks/useOpenPricingProrationsSidePanel'

import Button from '@/elements/Button'

const GetStartedPaymentMethodProrationsButton = () => {
  const { artist: { plan } } = React.useContext(ArtistContext)

  const openPricingProrationsSidePanel = useOpenPricingProrationsSidePanel()

  const openProrationsSidePanel = () => {
    openPricingProrationsSidePanel(plan)
  }

  return (
    <Button
      version="text"
      onClick={openProrationsSidePanel}
      trackComponentName="GetStartedPaymentMethodProrationsButton"
      className="w-full h-6 text-sm"
    >
      View payment breakdown
    </Button>
  )
}

GetStartedPaymentMethodProrationsButton.propTypes = {
}

GetStartedPaymentMethodProrationsButton.defaultProps = {
}

export default GetStartedPaymentMethodProrationsButton
