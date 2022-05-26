import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import BillingOrganisationInviteForm from '@/app/BillingOrganisationInviteForm'
import copy from '@/app/copy/billingCopy'
import sidePanelStyles from '@/SidePanel.module.css'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

const BillingOrganisationInvite = ({
  setSidePanelButton,
  toggleSidePanel,
  setSidePanelLoading,
}) => {
  // START SIDEPANEL LOADING
  React.useEffect(() => {
    setSidePanelLoading(true)
  }, [setSidePanelLoading])

  // WAIT FOR MOUNT
  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return
    setSidePanelLoading(false)
  }, [])

  // HANDLE SUCCESS
  const [success, setSuccess] = React.useState(false)

  // CHANGE SIDEPANEL BUTTON on SUCCESS
  React.useEffect(() => {
    if (success) {
      const button = <Button version="green" onClick={() => toggleSidePanel(false)} trackComponentName="BillingOrganisationInvite">Done</Button>
      setSidePanelButton(button)
    }
  }, [success, setSidePanelButton, toggleSidePanel])

  return (
    <div>
      <h2 className={sidePanelStyles.SidePanel__Header}>Invite someone to join your team</h2>
      <h4>{copy.inviteHeader}</h4>
      <MarkdownText markdown={copy.inviteDescription} />
      {success ? <MarkdownText markdown="Invite sent 🎉" /> : (
        <BillingOrganisationInviteForm
          className="mt-10"
          setSidePanelButton={setSidePanelButton}
          setSidePanelLoading={setSidePanelLoading}
          setSuccess={setSuccess}
        />
      )}
    </div>
  )
}

BillingOrganisationInvite.propTypes = {
  setSidePanelLoading: PropTypes.func.isRequired,
}

BillingOrganisationInvite.defaultProps = {

}

export default React.memo(BillingOrganisationInvite)
