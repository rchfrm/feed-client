import React from 'react'
// import PropTypes from 'prop-types'

import useGetStartedWizard from '@/app/hooks/useGetStartedWizard'

import GetStartedWizard from '@/app/GetStartedWizard'

// import Spinner from '@/elements/Spinner'

const GetStartedContent = () => {
  const {
    objective,
    platform,
    defaultLink,
    missingScopes,
    posts,
    adAccountId,
    facebookPixelId,
    locations,
    budget,
  } = useGetStartedWizard()

  return (
    <GetStartedWizard
      objective={objective}
      platform={platform}
      defaultLink={defaultLink}
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
