import React from 'react'
// IMPORT COMPONENTS
import AccountPageDetailsInline from './AccountPageDetailsInline'

const AccountPageContent = ({ user }) => {
  // The content
  return (
    <>
      <AccountPageDetailsInline user={user} />
    </>
  )
}

export default AccountPageContent
