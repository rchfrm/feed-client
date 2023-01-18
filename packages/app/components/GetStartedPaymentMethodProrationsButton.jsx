import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useOpenPricingProrationsSidePanel from '@/app/hooks/useOpenPricingProrationsSidePanel'

import Button from '@/elements/Button'

const GetStartedPaymentMethodProrationsButton = ({ promoCode }) => {
  const { artist } = React.useContext(ArtistContext)

  const openPricingProrationsSidePanel = useOpenPricingProrationsSidePanel()

  const openProrationsSidePanel = () => openPricingProrationsSidePanel(artist, promoCode)

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
  promoCode: PropTypes.string.isRequired,
}

GetStartedPaymentMethodProrationsButton.defaultProps = {
}

export default GetStartedPaymentMethodProrationsButton
