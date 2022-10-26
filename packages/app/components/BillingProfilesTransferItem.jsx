import React from 'react'
import PropTypes from 'prop-types'

import Error from '@/elements/Error'
import Button from '@/elements/Button'
import TickIcon from '@/icons/TickIcon'
import CrossIcon from '@/icons/CrossIcon'
import brandColors from '@/constants/brandColors'

import * as billingHelpers from '@/app/helpers/billingHelpers'
import useBillingStore from '@/app/stores/billingStore'

const getBillingStoreState = (state) => ({
  billingStoreOrg: state.organization,
  updateBillingStoreOrgArtists: state.updateOrganizationArtists,
})

const BillingProfilesTransferItem = ({
  organizationId,
  transferRequest,
  removeTransferRequest,
  setOrgArtists,
  className,
}) => {
  const [error, setError] = React.useState(null)
  const [loadingAccept, setLoadingAccept] = React.useState(false)
  const [loadingReject, setLoadingReject] = React.useState(false)
  const {
    billingStoreOrg,
    updateBillingStoreOrgArtists,
  } = useBillingStore(getBillingStoreState)

  const updateArtists = (updatedArtists) => {
    if (organizationId === billingStoreOrg.id) {
      updateBillingStoreOrgArtists(updatedArtists)
    }
    setOrgArtists(updatedArtists)
  }

  const handleAccept = async () => {
    setLoadingAccept(true)
    const acceptTransferResponse = await billingHelpers.acceptTransferRequest(transferRequest.token, organizationId)
    setLoadingAccept(false)
    if (acceptTransferResponse.error) {
      setError(acceptTransferResponse.error)
      return
    }

    removeTransferRequest(transferRequest)

    const organizationArtistsResponse = await billingHelpers.getOrganizationArtists(organizationId)
    if (organizationArtistsResponse.error) {
      setError(organizationArtistsResponse.error)
      return
    }

    updateArtists(organizationArtistsResponse.res.artists)
  }

  const handleReject = async () => {
    setLoadingReject(true)
    const { error: serverError } = await billingHelpers.rejectTransferRequest(transferRequest.token)
    setLoadingReject(false)
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
      <div className="flex items-center justify-between">
        <span className="ml-2">{transferRequest.profile_name}</span>
        <div className="flex justify-between mr-2">
          <Button
            version="green x-small"
            label="Accept"
            loading={loadingAccept}
            className="mr-2 h-10"
            onClick={handleAccept}
            trackComponentName="BillingProfilesTransferItem"
          >
            <TickIcon className="h-4 w-auto mr-2" fill={brandColors.white} />
            Yes
          </Button>
          <Button
            version="red x-small"
            label="Reject"
            loading={loadingReject}
            className="ml-2 h-10 w-10 rounded-full"
            onClick={handleReject}
            trackComponentName="BillingProfilesTransferItem"
          >
            <CrossIcon className="h-5 w-auto" fill={brandColors.white} />
          </Button>
        </div>
      </div>
      <Error error={error} />
    </div>
  )
}

BillingProfilesTransferItem.propTypes = {
  organizationId: PropTypes.string.isRequired,
  transferRequest: PropTypes.object.isRequired,
  removeTransferRequest: PropTypes.func.isRequired,
  setOrgArtists: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BillingProfilesTransferItem.defaultProps = {
  className: null,
}

export default BillingProfilesTransferItem
