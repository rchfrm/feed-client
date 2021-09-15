import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'
import usePrevious from 'use-previous'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import useBillingStore from '@/app/stores/billingStore'

import { transferReferralCredits } from '@/app/helpers/billingHelpers'
import { track } from '@/app/helpers/trackingHelpers'

const getOrg = state => state.organisation
const getAllOrgs = state => state.allOrgs

const BillingReferralsTransfer = ({
  className,
}) => {
  const allOrgs = useBillingStore(getAllOrgs)
  const organisation = useBillingStore(getOrg)
  const [selectedOrg, setSelectedOrg] = React.useState(organisation.id)
  const selectOptions = React.useMemo(() => {
    return allOrgs.map(({ id: value, name }) => { return { value, name } })
  }, [allOrgs])

  // SUBMIT
  const [updateTo, setUpdateTo] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const previousOrg = usePrevious(selectedOrg)
  const [error, setError] = React.useState(null)
  useAsyncEffect(async (isMounted) => {
    if (!updateTo) return
    setIsLoading(true)
    const { error = null } = await transferReferralCredits(previousOrg, selectedOrg)
    if (!isMounted()) return
    setIsLoading(false)
    setError(error)
    setUpdateTo('')
    if (error) {
      setSelectedOrg(previousOrg)
      return
    }
    track('billing_transfer_credits', {
      fromOrganisationId: organisation.id,
      toOrganisationId: selectedOrg.id,
    })
  }, [updateTo])
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <Error error={error} />
      <Select
        label="Spend credits on..."
        name="transfer-credits"
        options={selectOptions}
        selectedValue={selectedOrg}
        loading={isLoading}
        handleChange={(e) => {
          setSelectedOrg(e.target.value)
          setUpdateTo(e.target.value)
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
