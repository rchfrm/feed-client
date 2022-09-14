import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useAlertModal from '@/hooks/useAlertModal'
import useOpenPricingProrationsSidePanel from '@/app/hooks/useOpenPricingProrationsSidePanel'

import GetStartedDailyBudgetPromoCodeAlert from '@/app/GetStartedDailyBudgetPromoCodeAlert'

import Button from '@/elements/Button'

const GetStartedDailyBudgetPaymentRequiredButtons = ({
  organisationId,
  hasAppliedPromoCode,
  setHasAppliedPromoCode,
  setHasCheckedIfPaymentIsRequired,
}) => {
  const { artist: { plan } } = React.useContext(ArtistContext)
  const { showAlert, closeAlert } = useAlertModal()

  const openPricingProrationsSidePanel = useOpenPricingProrationsSidePanel()

  const openProrationsSidePanel = () => {
    openPricingProrationsSidePanel(plan)
  }

  const openPromoCodeModal = () => {
    const alertButtons = [{
      text: 'Close',
      onClick: closeAlert,
      color: 'black',
    }]

    const children = (
      <GetStartedDailyBudgetPromoCodeAlert
        organisationId={organisationId}
        setHasAppliedPromoCode={setHasAppliedPromoCode}
        setHasCheckedIfPaymentIsRequired={setHasCheckedIfPaymentIsRequired}
        closeAlert={closeAlert}
      />
    )
    showAlert({ children, buttons: alertButtons })
  }

  return (
    <>
      <Button
        version="text"
        onClick={openProrationsSidePanel}
        trackComponentName="GetStartedDailyBudgetPaymentRequiredButtons"
        className="h-6 text-sm mb-2"
      >
        View payment breakdown
      </Button>
      {!hasAppliedPromoCode && (
        <Button
          version="text"
          onClick={openPromoCodeModal}
          trackComponentName="GetStartedDailyBudgetPaymentRequiredButtons"
          className="h-6 text-sm mb-2"
        >
          Enter promo code
        </Button>
      )}
    </>
  )
}

GetStartedDailyBudgetPaymentRequiredButtons.propTypes = {
  organisationId: PropTypes.string.isRequired,
  hasAppliedPromoCode: PropTypes.bool.isRequired,
  setHasAppliedPromoCode: PropTypes.func.isRequired,
  setHasCheckedIfPaymentIsRequired: PropTypes.func.isRequired,
}

GetStartedDailyBudgetPaymentRequiredButtons.defaultProps = {
}

export default GetStartedDailyBudgetPaymentRequiredButtons
