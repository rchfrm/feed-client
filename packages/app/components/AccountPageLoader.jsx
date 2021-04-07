import React from 'react'
// IMPORT CONTEXTS
import { UserContext } from '@/contexts/UserContext'
// IMPORT COMPONENTS
import AccountPageDetails from '@/app/AccountPageDetails'

function AccountPageLoader() {
  // IMPORT USER STATE
  const { user } = React.useContext(UserContext)
  return <AccountPageDetails user={user} />
}

export default AccountPageLoader
