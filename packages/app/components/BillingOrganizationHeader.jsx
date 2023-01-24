import React from 'react'
import BillingOrganizationSelect from '@/app/BillingOrganizationSelect'
import BillingOrganizationInviteList from '@/app/BillingOrganizationInviteList'
import PropTypes from 'prop-types'

const BillingOrganizationHeader = ({
  organizationInvites,
  setOrgInvites,
  selectedOrgId,
  setSelectedOrgId,
}) => {
  if (! selectedOrgId) return null

  return (
    <div className="grid grid-cols-12 gap-8 mb-6">
      <div className="col-span-12 sm:col-span-6">
        {/* ACCEPT / REJECT ORGANIZATION INVITES */}
        <BillingOrganizationInviteList
          className="mb-12 sm:mb-0 rounded-dialogue border-solid border-2 border-red-light"
          organizationInvites={organizationInvites}
          setOrgInvites={setOrgInvites}
        />
        {/* SELECT ORG */}
        <BillingOrganizationSelect
          className="mb-12 sm:mb-0"
          selectedOrgId={selectedOrgId}
          setSelectedOrgId={setSelectedOrgId}
        />
      </div>
    </div>
  )
}

BillingOrganizationHeader.propTypes = {
  organizationInvites: PropTypes.array.isRequired,
  setOrgInvites: PropTypes.func.isRequired,
  selectedOrgId: PropTypes.string.isRequired,
  setSelectedOrgId: PropTypes.func.isRequired,
}

export default BillingOrganizationHeader
