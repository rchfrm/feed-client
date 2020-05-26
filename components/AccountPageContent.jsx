import React from 'react'

import { useRouter } from 'next/router'

import { BillingContext } from './contexts/BillingContext'
import { SidePanelContext } from './contexts/SidePanelContext'
import { InterfaceContext } from './contexts/InterfaceContext'
// IMPORT ELEMENTS
// IMPORT COMPONENTS
import AccountPageDetailsInline from './AccountPageDetailsInline'
import AccountPagePayments from './AccountPagePayments'
import PaymentAdd from './PaymentAdd'
import AccountPageSection from './AccountPageSection'
// IMPORT ASSETS
// IMPORT CONSTANTS

const AccountPageContent = ({ user }) => {
  // Import interface context
  const { setGlobalLoading } = React.useContext(InterfaceContext)

  // The content
  return (
    <>
      <AccountPageDetailsInline user={user} />
    </>
  )
}

AccountPageContent.propTypes = {

}

export default AccountPageContent
