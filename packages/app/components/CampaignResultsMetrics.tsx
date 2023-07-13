import React from 'react'
import ChevronIcon from '@/icons/ChevronIcon'
import brandColors from '@/constants/brandColors'

const CampaignResultsMetrics: React.FC = () => {
  const metrics = {
    spend: '£179.23',
    impressions: 34287,
    views: 1065,
    engagements: 9977,
    clicks: 11,
    likes: 9779,
    shares: 0,
    comments: 10,
    saves: 177,
  }

  return (
    <div
      className="relative w-full flex flex-col sm:flex-row mb-10 p-6 border border-b-4 border-solid border-grey-light rounded-dialogue"
    >
      <div className="flex flex-col sm:flex-row mb-4 sm:mb-0 sm:mr-6">
        <div className="w-full sm:w-auto h-full flex flex-col justify-center mb-2 sm:mb-0 sm:mr-4 p-4 bg-green-bg-dark rounded-dialogue">
          <div className="text-green-dark text-sm">Engagement Rate</div>
          <div className="flex">
            <ChevronIcon
              className="w-6 mr-1"
              fill={brandColors.black}
              direction="up"
            />
            <div className="text-2xl font-bold">7.20%</div>
          </div>
          <div className="text-sm"><span className="text-green-dark">Average:</span> 1.72%</div>
        </div>
        <div className="w-full sm:w-auto h-full flex flex-col justify-center mb-2 sm:mb-0 p-4 bg-yellow-bg-dark rounded-dialogue">
          <div className="text-yellow-dark text-sm">Cost per engagement</div>
          <div className="flex">
            <ChevronIcon
              className="w-6 mr-1"
              fill={brandColors.black}
              direction="up"
            />
            <div className="text-2xl font-bold">£0.0726</div>
          </div>
          <div className="text-sm"><span className="text-yellow-dark">Average:</span> £1.72</div>
        </div>
      </div>
      <div className="flex-1 items-between">
        <div className="flex flex-wrap -mx-2">
          {Object.entries(metrics).map(([ key, value]) => (
            <div className="flex-1 mx-2 mb-4 p-2 text-xs bg-offwhite rounded-dialogue">
              <div className="text-anthracite">{key}</div>
              <div className='text-sm'>{value}</div>
            </div>
          ))}
        </div>
        <div className="w-full p-2 text-xs text-center mt-auto bg-offwhite rounded-dialogue">Select up to 2 factors to  show on the chart below.</div>
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 border-solid border-t-grey-light border-t-[14px] border-x-transparent border-x-[10px] border-b-0" />
    </div>
  )
}

export default CampaignResultsMetrics
