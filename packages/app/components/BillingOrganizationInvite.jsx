import React from 'react'

import BillingOrganizationInviteForm from '@/app/BillingOrganizationInviteForm'

import copy from '@/app/copy/billingCopy'

import MarkdownText from '@/elements/MarkdownText'

const BillingOrganizationInvite = () => {
  const [success, setSuccess] = React.useState(false)

  React.useEffect(() => {
    if (!success) return

    const timeout = setTimeout(() => {
      setSuccess(false)
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [success])

  return (
    <div>
      <h3 className="font-bold">Invite someone to join your team</h3>
      <MarkdownText markdown={copy.inviteDescription} />
      {success ? <MarkdownText markdown="Invite sent 🎉" /> : (
        <BillingOrganizationInviteForm
          className="w-full lg:w-2/3 mt-10"
          setSuccess={setSuccess}
        />
      )}
    </div>
  )
}

BillingOrganizationInvite.propTypes = {
}

BillingOrganizationInvite.defaultProps = {

}

export default React.memo(BillingOrganizationInvite)
