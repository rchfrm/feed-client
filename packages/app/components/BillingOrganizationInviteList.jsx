import React from 'react'
import PropTypes from 'prop-types'

import BillingOrganizationInviteItem from '@/app/BillingOrganizationInviteItem'

import useBillingStore from '@/app/stores/billingStore'

const getBillingStoreState = (state) => ({
  organizationInvites: state.organizationInvites,
  removeOrganizationInvite: state.removeOrganizationInvite,
})

const BillingOrganizationInvitesList = ({
  className,
}) => {
  const { organizationInvites, removeOrganizationInvite } = useBillingStore(getBillingStoreState)
  return (
    <>
      {/* INVITATIONS LIST */}
      <div
        className={[
          className,
        ].join(' ')}
      >
        {organizationInvites.map((organizationInvite, idx) => (
          <BillingOrganizationInviteItem
            organizationInvite={organizationInvite}
            removeOrganizationInvite={removeOrganizationInvite}
            className="mt-3 mr-3 mb-6 ml-3 last:mb-3"
            key={idx}
          />
        ))}
      </div>
      {/* PLACEHOLDER FOR THE 2-nd COLUMN */}
      <div />
    </>
  )
}

BillingOrganizationInvitesList.propTypes = {
  className: PropTypes.string,
}

BillingOrganizationInvitesList.defaultProps = {
  className: null,
}

export default BillingOrganizationInvitesList
