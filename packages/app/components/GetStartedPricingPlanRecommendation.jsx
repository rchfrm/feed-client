import React from 'react'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import LightbulbIcon from '@/icons/LightbulbIcon'

import brandColors from '@/constants/brandColors'

const GetStartedPricingPlanRecommendation = () => {
  const isDesktop = useBreakpointTest('sm')

  return (
    <div className={[
      'absolute left-0',
      isDesktop ? 'left-0 -top-9' : 'bottom-0 right-0',
      'flex items-center justify-center',
      'w-full h-8 p-3',
      'outline outline-[5px] outline-solid outline-insta',
      'rounded-b-dialogue sm:rounded-t-dialogue sm:rounded-b-none bg-insta',
      'text-xs text-white italic',
    ].join(' ')}
    >
      <LightbulbIcon className="h-4 w-4 mr-1" fill={brandColors.white} />
      Recommended based on your settings
    </div>
  )
}

GetStartedPricingPlanRecommendation.propTypes = {
}

GetStartedPricingPlanRecommendation.defaultProps = {
}

export default GetStartedPricingPlanRecommendation