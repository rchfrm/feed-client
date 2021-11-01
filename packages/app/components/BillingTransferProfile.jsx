import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import BillingTransferProfileForm from '@/app/BillingTransferProfileForm'
import copy from '@/app/copy/billingCopy'
import sidePanelStyles from '@/app/SidePanel.module.css'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

const BillingTransferProfile = ({
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
      const button = <Button version="green" onClick={() => toggleSidePanel(false)} trackComponentName="BillingTransferProfile">Done</Button>
      setSidePanelButton(button)
    }
  }, [success, setSidePanelButton, toggleSidePanel])

  return (
    <div>
      <h2 className={sidePanelStyles.SidePanel__Header}>Manage profiles</h2>
      <h4>{copy.transferHeader}</h4>
      <MarkdownText markdown={copy.transferDescription} />
      {success ? <MarkdownText markdown="Request sent 🎉" /> : (
        <BillingTransferProfileForm
          className="mt-10"
          setSidePanelButton={setSidePanelButton}
          setSidePanelLoading={setSidePanelLoading}
          setSuccess={setSuccess}
        />
      )}
    </div>
  )
}

BillingTransferProfile.propTypes = {
  setSidePanelLoading: PropTypes.func.isRequired,
}

BillingTransferProfile.defaultProps = {

}

export default React.memo(BillingTransferProfile)
