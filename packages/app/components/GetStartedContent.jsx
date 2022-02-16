import React from 'react'
// import PropTypes from 'prop-types'

import useGetStartedWizard from '@/app/hooks/useGetStartedWizard'

import GetStartedWizard from '@/app/GetStartedWizard'

const GetStartedContent = () => {
  const {
    isLoading,
    objective,
    platform,
    defaultLink,
    scopes,
    posts,
    adAccountId,
    facebookPixelId,
    locations,
    budget,
  } = useGetStartedWizard()

  return (
    <GetStartedWizard
      isLoading={isLoading}
      objective={objective}
      platform={platform}
      defaultLink={defaultLink}
      scopes={scopes}
      posts={posts}
      adAccountId={adAccountId}
      facebookPixelId={facebookPixelId}
      locations={locations}
      budget={budget}
    />
  )
}

GetStartedContent.propTypes = {
}

GetStartedContent.defaultProps = {
}

export default GetStartedContent
