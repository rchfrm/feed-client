import React from 'react'
import PropTypes from 'prop-types'
import BillingOrganizationInviteItem from '@/app/BillingOrganizationInviteItem'

const BillingOrganizationInviteList = ({
  className,
  organizationInvites,
  setOrgInvites,
}) => {
  if (organizationInvites.length === 0) {
    return null
  }

  const removeOrganizationInvite = orgInvite => {
    const updatedOrgInvites = organizationInvites.filter(oi => oi.token !== orgInvite.token)
    setOrgInvites(updatedOrgInvites)
  }

  return (
    <>
      {/* INVITATIONS LIST */}
      <div className={[className].join(' ')}>
        {organizationInvites.map((organizationInvite, idx) => (
          <BillingOrganizationInviteItem
            organizationInvite={organizationInvite}
            removeOrganizationInvite={removeOrganizationInvite}
            className="mt-3 mr-3 mb-6 ml-3 last:mb-3"
            key={idx}
          />
        ))}
      </div>
    </>
  )
}

BillingOrganizationInviteList.propTypes = {
  className: PropTypes.string,
  organizationInvites: PropTypes.array.isRequired,
  setOrgInvites: PropTypes.func.isRequired,
}

BillingOrganizationInviteList.defaultProps = {
  className: null,
}

export default BillingOrganizationInviteList
