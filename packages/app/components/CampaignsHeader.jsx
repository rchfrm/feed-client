import React from 'react'

const CampaignsHeader = ({ shouldShowCampaigns }) => {
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

export default CampaignsHeader
