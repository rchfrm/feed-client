import React from 'react'
import PropTypes from 'prop-types'

import Error from '@/elements/Error'
import Button from '@/elements/Button'
import TickIcon from '@/icons/TickIcon'
import CrossIcon from '@/icons/CrossIcon'
import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/billingCopy'
import * as billingHelpers from '@/app/helpers/billingHelpers'

const BillingOrganisationInviteItem = ({
  className,
  organisationInvite,
  removeOrganisationInvite,
}) => {
  const [error, setError] = React.useState(null)

  const handleAccept = async () => {
    const { error: serverError } = await billingHelpers.acceptOrganisationInvite(organisationInvite.token)
    if (serverError) {
      setError(serverError)
      return
    }

    removeOrganisationInvite(organisationInvite)
    window.location.reload()
  }

  const handleReject = async () => {
    const { error: serverError } = await billingHelpers.rejectOrganisationInvite(organisationInvite.token)
    if (serverError) {
      setError(serverError)
      return
    }

    removeOrganisationInvite(organisationInvite)
  }

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <Error error={error} />
      <h4 className="font-display m-0">{copy.invited(organisationInvite.inviting_user_name)}</h4>
      <div className="flex justify-between lg:w-1/2 mt-5">
        <Button
          version="green x-small"
          label="Accept"
          className="w-1/2 mr-1 md:mr-2"
          onClick={handleAccept}
        >
          <TickIcon className="h-5 w-auto mr-2" fill={brandColors.white} />
          Accept
        </Button>
        <Button
          version="red x-small"
          label="Reject"
          className="w-1/2 ml-1 md:ml-2"
          onClick={handleReject}
        >
          <CrossIcon className="h-6 w-auto mr-2" fill={brandColors.white} />
          Reject
        </Button>
      </div>
    </div>
  )
}

BillingOrganisationInviteItem.propTypes = {
  organisationInvite: PropTypes.object.isRequired,
  removeOrganisationInvite: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BillingOrganisationInviteItem.defaultProps = {
  className: null,
}

export default BillingOrganisationInviteItem
