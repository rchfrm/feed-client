import React from 'react'
import PropTypes from 'prop-types'

import { campaignTypes, growthGradient, conversionsGradient } from '@/app/helpers/postsHelpers'

const PostCardSettingsTabs = ({ campaignType, setCampaignType }) => {
  return (
    <div className="flex mb-6 text-lg text-grey-3">
      {campaignTypes.map(({ title, slug }) => {
        const isActive = campaignType === slug
        return (
          <div
            key={slug}
            className={[
              'flex items-center',
              'mr-5',
              isActive ? 'text-black border-solid border-black border-b-2' : '',
            ].join(' ')}
          >
            <span
              className="w-4 h-4 rounded-full mr-1"
              style={{
                background: slug === 'all' ? growthGradient : conversionsGradient,
              }}
            />
            <button
              type="button"
              className={[
                isActive ? 'font-bold' : '',
              ].join(' ')}
              onClick={() => setCampaignType(slug)}
            >
              {title}
            </button>
          </div>
        )
      })}
    </div>
  )
}

PostCardSettingsTabs.propTypes = {
  campaignType: PropTypes.string.isRequired,
  setCampaignType: PropTypes.func.isRequired,
}

PostCardSettingsTabs.defaultProps = {

}

export default PostCardSettingsTabs
