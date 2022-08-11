import React from 'react'

import BillingOrganisationInviteForm from '@/app/BillingOrganisationInviteForm'

import copy from '@/app/copy/billingCopy'

import MarkdownText from '@/elements/MarkdownText'

const BillingOrganisationInvite = () => {
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
        <BillingOrganisationInviteForm
          className="mt-10"
          setSuccess={setSuccess}
        />
      )}
    </div>
  )
}

BillingOrganisationInvite.propTypes = {
}

BillingOrganisationInvite.defaultProps = {

}

export default React.memo(BillingOrganisationInvite)
