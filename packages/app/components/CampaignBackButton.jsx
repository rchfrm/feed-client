import React from 'react'
import Router from 'next/router'
import * as ROUTES from '@/app/constants/routes'

const CampaignBackButton = () => {
  const handleClick = () => {
    Router.push(ROUTES.HOME)
  }

  return (
    <>
      <div>CampaignBackButton</div>
      <button
        onClick={handleClick}
      >
        Back
      </button>
    </>
  )
}

export default CampaignBackButton
