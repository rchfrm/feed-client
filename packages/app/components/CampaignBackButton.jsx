import React from 'react'
import Router from 'next/router'
import Button from '@/elements/Button'
import BackIcon from '@/icons/BackIcon'
import * as ROUTES from '@/app/constants/routes'

const CampaignBackButton = () => {
  const handleClick = () => {
    Router.push(ROUTES.HOME)
  }

  return (
    <Button
      version="secondary"
      onClick={handleClick}
      trackComponentName="CampaignBackButton"
      className="w-12 h-10"
    >
      <BackIcon
        direction="right"
        className="w-5 h-auto"
      />
    </Button>
  )
}

export default CampaignBackButton
