import React from 'react'
// IMPORT CONTEXTS
import { UserContext } from '@/app/contexts/UserContext'
import { BillingContextProvider } from '@/app/contexts/BillingContext'
// IMPORT COMPONENTS
import AccountPageContent from '@/app/AccountPageContent'

function AccountPageLoader() {
  // IMPORT USER STATE
  const { user } = React.useContext(UserContext)

  return (
    <BillingContextProvider user={user}>
      <AccountPageContent user={user} />
    </BillingContextProvider>
  )
}

export default AccountPageLoader
