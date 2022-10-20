import React from 'react'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import BillingOrganizationSelect from '@/app/BillingOrganizationSelect'
import BillingOrganizationInviteList from '@/app/BillingOrganizationInviteList'

const getBillingStoreState = (state) => ({
  organization: state.organization,
  organizationInvites: state.organizationInvites,
  allOrgs: state.allOrgs,
})

const BillingOrganizationHeader = () => {
  const {
    organization,
    allOrgs,
    organizationInvites,
  } = useBillingStore(getBillingStoreState, shallow)

  return (
    <div className="grid grid-cols-12 gap-8 mb-6">
      <div className="col-span-12 sm:col-span-6">
        {/* ACCEPT / REJECT ORGANIZATION INVITES */}
        {organizationInvites.length > 0 && (
          <BillingOrganizationInviteList
            className="mb-12 sm:mb-0 rounded-dialogue border-solid border-2 border-redLight"
          />
        )}
        {/* SELECT ORG */}
        {/* {allOrgs.length >= 2 && ( */}
        {/*  <BillingOrganizationSelect */}
        {/*    className="mb-12 sm:mb-0" */}
        {/*    organization={organization} */}
        {/*    allOrgs={allOrgs} */}
        {/*  /> */}
        {/* )} */}
      </div>
    </div>
  )
}

BillingOrganizationHeader.propTypes = {
}

BillingOrganizationHeader.defaultProps = {
}

export default BillingOrganizationHeader
