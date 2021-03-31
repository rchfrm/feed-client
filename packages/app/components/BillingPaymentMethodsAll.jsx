import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import BillingPaymentCard from '@/app/BillingPaymentCard'

import useBillingStore from '@/app/stores/billingStore'

import useBillingAddPayment from '@/app/hooks/useBillingAddPayment'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import sidePanelStyles from '@/app/SidePanel.module.css'

const getBillingDetails = state => state.billingDetails
const getDefaultPaymentMethod = state => state.defaultPaymentMethod

const BillingPaymentMethodsAll = ({ className }) => {
  const billingDetails = useBillingStore(getBillingDetails)
  const defaultPaymentMethod = useBillingStore(getDefaultPaymentMethod)
  const { allPaymentMethods } = billingDetails

  const [selectedCardId, setSelectedCardId] = React.useState(defaultPaymentMethod.id)

  // SET SIDE PANEL BUTTON
  const { setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)
  React.useEffect(() => {
    const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>
    setSidePanelButton(button)
  }, [setSidePanelButton, toggleSidePanel])

  // GET FUNCTION TO ADD PAYMENT METHOD
  const openAddPaymentMethod = useBillingAddPayment()

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h2 className={sidePanelStyles.SidePanel__Header}>All Payment Methods</h2>
      {/* LIST CARDS */}
      {allPaymentMethods.map((method) => {
        const { id, card, billing_details: cardBillingDetails, is_default } = method
        return (
          <BillingPaymentCard
            key={id}
            card={card}
            billingDetails={cardBillingDetails}
            isDefault={is_default}
            isSelected={id === selectedCardId}
            isButton
            onClick={() => {
              setSelectedCardId(id)
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
