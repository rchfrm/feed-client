import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import Button from '@/elements/Button'
import Error from '@/elements/Error'

import BillingPaymentCard from '@/app/BillingPaymentCard'

import useBillingStore from '@/app/stores/billingStore'

import useBillingAddPayment from '@/app/hooks/useBillingAddPayment'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import { setPaymentAsDefault } from '@/app/helpers/paymentHelpers'

import sidePanelStyles from '@/app/SidePanel.module.css'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  billingDetails: state.billingDetails,
  defaultPaymentMethod: state.defaultPaymentMethod,
  organisation: state.organisation,
  updateDefaultPayment: state.updateDefaultPayment,
})


const BillingPaymentMethodsAll = ({ className }) => {
  // Read from BILLING STORE
  const {
    billingDetails: { allPaymentMethods },
    defaultPaymentMethod,
    organisation: { id: organisationId },
    updateDefaultPayment,
  } = useBillingStore(getBillingStoreState, shallow)

  // SIDEPANEL CONTEXT
  const { setSidePanelButton, toggleSidePanel, setSidePanelLoading } = React.useContext(SidePanelContext)

  // STORE SELECTED STATE
  const [selectedMethodId, setSelectedMethodId] = React.useState(defaultPaymentMethod.id)

  // SET AS DEFAULT
  const [error, setError] = React.useState(null)
  const setMethodAsDefault = React.useCallback(async () => {
    setSidePanelLoading(true)
    const { res: newDefaultPaymentMethod, error } = await setPaymentAsDefault(organisationId, selectedMethodId)
    // Handle error
    if (error) {
      setError(error)
      return
    }
    // Update default in store
    updateDefaultPayment(newDefaultPaymentMethod)
    setSidePanelLoading(false)
    setError(null)
  }, [organisationId, selectedMethodId, setSidePanelLoading, updateDefaultPayment])

  // SET SIDE PANEL BUTTON
  React.useEffect(() => {
    // Check whether the user has selected a new default card
    const hasDefaultSelectionChanged = selectedMethodId !== defaultPaymentMethod.id
    // Update default
    if (hasDefaultSelectionChanged) {
      const button = <Button version="green" onClick={setMethodAsDefault}>Save</Button>
      setSidePanelButton(button)
      return
    }
    // JUST CLOSE DEFAULT SIDEPANEL
    const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>
    setSidePanelButton(button)
  }, [setSidePanelButton, toggleSidePanel, selectedMethodId, defaultPaymentMethod, setMethodAsDefault])

  // GET FUNCTION TO ADD PAYMENT METHOD
  const openAddPaymentMethod = useBillingAddPayment()

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h2 className={sidePanelStyles.SidePanel__Header}>All Payment Methods</h2>
      <Error error={error} />
      {/* LIST CARDS */}
      {allPaymentMethods.map((method) => {
        const { id, card, billing_details: cardBillingDetails, is_default } = method
        return (
          <BillingPaymentCard
            key={id}
            card={card}
            billingDetails={cardBillingDetails}
            isDefault={is_default}
            isSelected={id === selectedMethodId}
            isButton
            onClick={() => {
              setSelectedMethodId(id)
            }}
            className="mb-6 last:mb-0"
          />
        )
      })}
      {/* ADD NEW */}
      <div>
        <Button
          version="green x-small"
          onClick={openAddPaymentMethod}
        >
          + Add new card
        </Button>
      </div>
    </div>
  )
}

BillingPaymentMethodsAll.propTypes = {
  className: PropTypes.string,
}

BillingPaymentMethodsAll.defaultProps = {
  className: null,
}

export default BillingPaymentMethodsAll
