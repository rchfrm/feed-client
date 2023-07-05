import React from 'react'
import PropTypes from 'prop-types'

const CampaignsHeader = ({
  campaigns,
  shouldShowCampaigns,
}) => {
  // eslint-disable-next-line no-console
  console.log(campaigns)

  return (
    <>
      <h1>Your campaigns</h1>
      {shouldShowCampaigns ? (
        <div className="mb-8">
          <p className="w-1/2">There are currently <strong>2 active engagement campaigns</strong>, with <strong>2 days</strong> and <strong>£47.70 left in the campaign.</strong></p>
          <p>Data updated at 11am on 7 June 2023.</p>
        </div>
      ) : (
        <p>There is currently no campaigns data available.</p>
      )}
    </>
  )
}

CampaignsHeader.propTypes = {
  campaigns: PropTypes.array.isRequired,
  shouldShowCampaigns: PropTypes.bool.isRequired,
}

export default CampaignsHeader
