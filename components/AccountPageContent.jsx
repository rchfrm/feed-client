import React from 'react'
// IMPORT ELEMENTS
// IMPORT COMPONENTS
import AccountPageDetailsInline from '@/AccountPageDetailsInline'
// IMPORT ASSETS
// IMPORT CONSTANTS

const AccountPageContent = ({ user }) => {
  // The content
  return (
    <>
      <AccountPageDetailsInline user={user} />
    </>
  )
}

export default AccountPageContent
