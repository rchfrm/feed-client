import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import usePrevious from 'use-previous'

import Select from '@/elements/Select'
import Error from '@/elements/Error'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

// import { UserContext } from '@/app/contexts/UserContext'

import useBillingStore from '@/app/stores/billingStore'

import { transferReferralCredits } from '@/app/helpers/billingHelpers'
import { track } from '@/app/helpers/trackingHelpers'

import copy from '@/app/copy/billingCopy'

const getOrg = state => state.organisation
const getAllOrgs = state => state.allOrgs

const BillingReferralsTransfer = ({
  className,
}) => {
  // const { user: { organizations } } = React.useContext(UserContext)
  // const allOrgs = Object.values(organizations).filter((organization) => !organization.apply_referral_credit)
  const allOrgs = useBillingStore(getAllOrgs)
  const organisation = useBillingStore(getOrg)
  const [selectedOrg, setSelectedOrg] = React.useState(organisation.id)
  const selectOptions = React.useMemo(() => {
    return allOrgs.map(({ id: value, name }) => { return { value, name } })
  }, [allOrgs])

  // SIDE PANEL
  const { setSidePanelButton } = React.useContext(SidePanelContext)

  // SUBMIT
  const [isLoading, setIsLoading] = React.useState(false)
  const previousOrg = usePrevious(selectedOrg)
  const [error, setError] = React.useState(null)

  const transferCredits = React.useCallback(async () => {
    if (!selectedOrg) return
    setIsLoading(true)
    const { error = null } = await transferReferralCredits(selectedOrg)
    setIsLoading(false)
    setError(error)
    if (error) {
      setSelectedOrg(previousOrg)
      return
    }
    track('billing_transfer_credits', {
      fromOrganisationId: organisation.id,
      toOrganisationId: selectedOrg,
    })
  }, [organisation.id, previousOrg, selectedOrg])

  // CHANGE SIDEPANEL BUTTON
  React.useEffect(() => {
    const button = <Button version="green" onClick={() => transferCredits()}>Transfer</Button>
    setSidePanelButton(button)
  }, [setSidePanelButton, transferCredits])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h2>Transfer credits</h2>
      <MarkdownText markdown={copy.transferCreditsDescription(20)} className="mb-12" />
      <Error error={error} />
      <Select
        name="transfer-credits"
        options={selectOptions}
        selectedValue={selectedOrg}
        loading={isLoading}
        handleChange={(e) => {
          setSelectedOrg(e.target.value)
        }}
      />
    </div>
  )
}

BillingReferralsTransfer.propTypes = {
  className: PropTypes.string,
}

BillingReferralsTransfer.defaultProps = {
  className: null,
}

export default BillingReferralsTransfer
