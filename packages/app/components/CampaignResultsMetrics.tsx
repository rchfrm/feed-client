import React from 'react'
import ChevronIcon from '@/icons/ChevronIcon'
import brandColors from '@/constants/brandColors'

const CampaignResultsMetrics: React.FC = () => {
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
          <div className="flex-1 mx-2 mb-4 p-2 text-xs bg-offwhite rounded-dialogue">
            <div className="text-anthracite">Spend</div>
            <div>£179.23</div>
          </div>
          <div className="flex-1 mx-2 mb-4 p-2 text-xs bg-offwhite rounded-dialogue">
            <div className="text-anthracite">Impressions</div>
            <div className="text-sm">34287</div>
          </div>
          <div className="flex-1 mx-2 mb-4 p-2 text-xs bg-offwhite rounded-dialogue">
            <div className="text-anthracite">Views</div>
            <div className="text-sm">1065</div>
          </div>
          <div className="flex-1 mx-2 mb-4 p-2 text-xs bg-offwhite rounded-dialogue">
            <div className="text-anthracite">Engagements</div>
            <div className="text-sm">9977</div>
          </div>
          <div className="flex-1 mx-2 mb-4 p-2 text-xs bg-offwhite rounded-dialogue">
            <div className="text-anthracite">Clicks</div>
            <div className="text-sm">11</div>
          </div>
          <div className="flex-1 mx-2 mb-4 p-2 text-xs bg-offwhite rounded-dialogue">
            <div className="text-anthracite">Likes</div>
            <div className="text-sm">9779</div>
          </div>
          <div className="flex-1 mx-2 mb-4 p-2 text-xs bg-offwhite rounded-dialogue">
            <div className="text-anthracite">Shares</div>
            <div className="text-sm">0</div>
          </div>
          <div className="flex-1 mx-2 mb-4 p-2 text-xs bg-offwhite rounded-dialogue">
            <div className="text-anthracite">Comments</div>
            <div className="text-sm">10</div>
          </div>
          <div className="flex-1 mx-2 mb-4 p-2 text-xs bg-offwhite rounded-dialogue">
            <div className="text-anthracite">Saves</div>
            <div className="text-sm">177</div>
          </div>
        </div>
        <div className="w-full p-2 text-xs text-center mt-auto bg-offwhite rounded-dialogue">Select up to 2 factors to  show on the chart below.</div>
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 border-solid border-t-grey-light border-t-[14px] border-x-transparent border-x-[10px] border-b-0" />
    </div>
  )
}

export default CampaignResultsMetrics
