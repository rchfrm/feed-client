import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import BillingProfilesTransferItem from '@/app/BillingProfilesTransferItem'
import copy from '@/app/copy/billingCopy'

const BillingProfilesTransferList = ({
  organisationId,
  transferRequests,
  removeTransferRequest,
  updateOrganisationArtists,
  className,
}) => {
  return (
    <>
      {/* PROFILE TRANSFERS LIST */}
      <div
        className={[
          className,
        ].join(' ')}
      >
        <MarkdownText className="mt-5" markdown={copy.resolveTransfers(transferRequests.length)} />
        <div className="rounded-dialogue border-solid border-2 border-redLight mb-4">
          {transferRequests.map((transferRequest, idx) => (
            <BillingProfilesTransferItem
              organisationId={organisationId}
              transferRequest={transferRequest}
              removeTransferRequest={removeTransferRequest}
              updateOrganisationArtists={updateOrganisationArtists}
              className="m-3"
              key={idx}
            />
          ))}
        </div>
      </div>
    </>
  )
}

BillingProfilesTransferList.propTypes = {
  organisationId: PropTypes.func.isRequired,
  transferRequests: PropTypes.func.isRequired,
  removeTransferRequest: PropTypes.func.isRequired,
  updateOrganisationArtists: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BillingProfilesTransferList.defaultProps = {
  className: null,
}

export default BillingProfilesTransferList
