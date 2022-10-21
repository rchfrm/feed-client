import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import BillingProfilesTransferItem from '@/app/BillingProfilesTransferItem'
import copy from '@/app/copy/billingCopy'
import Error from '@/elements/Error'

const BillingProfilesTransferList = ({
  error,
  organizationId,
  transferRequests,
  removeTransferRequest,
  setOrgArtists,
  className,
}) => {
  if (error) {
    return <Error error={error} />
  }

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
              organizationId={organizationId}
              transferRequest={transferRequest}
              removeTransferRequest={removeTransferRequest}
              setOrgArtists={setOrgArtists}
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
  error: PropTypes.object,
  organizationId: PropTypes.string.isRequired,
  transferRequests: PropTypes.array.isRequired,
  removeTransferRequest: PropTypes.func.isRequired,
  setOrgArtists: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BillingProfilesTransferList.defaultProps = {
  className: null,
  error: null,
}

export default BillingProfilesTransferList
