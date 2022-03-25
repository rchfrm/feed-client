import React from 'react'

import useGetStartedWizard from '@/app/hooks/useGetStartedWizard'

import GetStartedWizard from '@/app/GetStartedWizard'

const GetStartedContent = () => {
  const {
    isLoading,
    objective,
    platform,
    defaultLink,
    posts,
    defaultPromotionEnabled,
    adAccountId,
    facebookPixelId,
    locations,
    hasSufficientBudget,
  } = useGetStartedWizard()

  return (
    <GetStartedWizard
      isLoading={isLoading}
      objective={objective}
      platform={platform}
      defaultLink={defaultLink}
      posts={posts}
      defaultPromotionEnabled={defaultPromotionEnabled}
      adAccountId={adAccountId}
      facebookPixelId={facebookPixelId}
      locations={locations}
      hasSufficientBudget={hasSufficientBudget}
    />
  )
}

GetStartedContent.propTypes = {
}

GetStartedContent.defaultProps = {
}

export default GetStartedContent
