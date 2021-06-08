import React from 'react'
import PropTypes from 'prop-types'

import BillingOrganisationInviteItem from '@/app/BillingOrganisationInviteItem'

import useBillingStore from '@/app/stores/billingStore'

const getBillingStoreState = (state) => ({
  organisationInvites: state.organisationInvites,
  removeOrganisationInvite: state.removeOrganisationInvite,
})

const BillingOrganisationInvitesList = ({
  className,
}) => {
  const { organisationInvites, removeOrganisationInvite } = useBillingStore(getBillingStoreState)
  return (
    <>
      {/* INVITATIONS LIST */}
      <div
        className={[
          className,
        ].join(' ')}
      >
        {organisationInvites.map((organisationInvite, idx) => (
          <BillingOrganisationInviteItem
            organisationInvite={organisationInvite}
            removeOrganisationInvite={removeOrganisationInvite}
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

BillingOrganisationInvitesList.propTypes = {
  className: PropTypes.string,
}

BillingOrganisationInvitesList.defaultProps = {
  className: null,
}

export default BillingOrganisationInvitesList
