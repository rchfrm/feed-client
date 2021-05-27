import React from 'react'
import PropTypes from 'prop-types'

import Error from '@/elements/Error'
import Button from '@/elements/Button'
import TickIcon from '@/icons/TickIcon'
import CrossIcon from '@/icons/CrossIcon'
import brandColors from '@/constants/brandColors'

import * as billingHelpers from '@/app/helpers/billingHelpers'

const BillingProfilesTransferItem = ({
  organisationId,
  transferRequest,
  removeTransferRequest,
  updateOrganisationArtists,
  className,
}) => {
  const [error, setError] = React.useState(null)

  const handleAccept = async () => {
    const acceptTransferResponse = await billingHelpers.acceptTransferRequest(transferRequest.token, organisationId)
    if (acceptTransferResponse.error) {
      setError(acceptTransferResponse.error)
      return
    }

    removeTransferRequest(transferRequest)

    const organisationArtistsResponse = await await billingHelpers.getOrganisationArtists(organisationId)
    if (organisationArtistsResponse.error) {
      setError(organisationArtistsResponse.error)
      return
    }

    updateOrganisationArtists(organisationArtistsResponse.res.artists)
  }

  const handleReject = async () => {
    const { error: serverError } = await billingHelpers.rejectTransferRequest(transferRequest.token)
    if (serverError) {
      setError(serverError)
      return
    }

    removeTransferRequest(transferRequest)
  }

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <Error error={error} />
      <div className="flex items-center justify-between">
        <span className="ml-2">{transferRequest.profile_name}</span>
        <div className="flex justify-between mr-2">
          <Button
            version="green x-small"
            label="Accept"
            className="mr-2 h-10"
            onClick={handleAccept}
          >
            <TickIcon className="h-4 w-auto mr-2" fill={brandColors.white} />
            Yes
          </Button>
          <Button
            version="red x-small"
            label="Reject"
            className="ml-2 h-10 w-10 rounded-full"
            onClick={handleReject}
          >
            <CrossIcon className="h-5 w-auto" fill={brandColors.white} />
          </Button>
        </div>
      </div>
    </div>
  )
}

BillingProfilesTransferItem.propTypes = {
  organisationId: PropTypes.string.isRequired,
  transferRequest: PropTypes.object.isRequired,
  removeTransferRequest: PropTypes.func.isRequired,
  updateOrganisationArtists: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BillingProfilesTransferItem.defaultProps = {
  className: null,
}

export default BillingProfilesTransferItem
