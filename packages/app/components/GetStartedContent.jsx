import React from 'react'
// import PropTypes from 'prop-types'

import useGetStartedWizard from '@/app/hooks/useGetStartedWizard'

import GetStartedWizard from '@/app/GetStartedWizard'

import Spinner from '@/elements/Spinner'

const GetStartedContent = () => {
  const {
    isLoading,
    objective,
    platform,
    defaultLinkId,
    missingScopes,
    posts,
    adAccountId,
    facebookPixelId,
    locations,
    budget,
  } = useGetStartedWizard()

  if (isLoading) return <Spinner />

  return (
    <GetStartedWizard
      objective={objective}
      platform={platform}
      defaultLinkId={defaultLinkId}
      missingScopes={missingScopes}
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
