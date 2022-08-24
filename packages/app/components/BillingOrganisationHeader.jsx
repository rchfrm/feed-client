import React from 'react'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import BillingOrganisationSelect from '@/app/BillingOrganisationSelect'
import BillingOrganisationInviteList from '@/app/BillingOrganisationInviteList'

const getBillingStoreState = (state) => ({
  organisation: state.organisation,
  organisationInvites: state.organisationInvites,
  allOrgs: state.allOrgs,
})

const BillingOrganisationHeader = () => {
  const {
    organisation,
    allOrgs,
    organisationInvites,
  } = useBillingStore(getBillingStoreState, shallow)

  return (
    <div className="grid grid-cols-12 gap-8 mb-6">
      <div className="col-span-12 sm:col-span-6">
        {/* ACCEPT / REJECT ORGANISATION INVITES */}
        {organisationInvites.length > 0 && (
          <BillingOrganisationInviteList
            className="mb-12 sm:mb-0 rounded-dialogue border-solid border-2 border-redLight"
          />
        )}
        {/* SELECT ORG */}
        {allOrgs.length >= 2 && (
          <BillingOrganisationSelect
            className="mb-12 sm:mb-0"
            organisation={organisation}
            allOrgs={allOrgs}
          />
        )}
      </div>
    </div>
  )
}

BillingOrganisationHeader.propTypes = {
}

BillingOrganisationHeader.defaultProps = {
}

export default BillingOrganisationHeader
