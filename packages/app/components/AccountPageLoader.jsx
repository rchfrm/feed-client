import React from 'react'
// IMPORT CONTEXTS
import { UserContext } from '@/contexts/UserContext'
import { BillingContextProvider } from '@/app/contexts/BillingContext'
// IMPORT COMPONENTS
import AccountPageDetails from '@/app/AccountPageDetails'

function AccountPageLoader() {
  // IMPORT USER STATE
  const { user } = React.useContext(UserContext)

  return (
    <BillingContextProvider user={user}>
      <AccountPageDetails user={user} />
    </BillingContextProvider>
  )
}

export default AccountPageLoader
