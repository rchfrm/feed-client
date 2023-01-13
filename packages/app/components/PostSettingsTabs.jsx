import React from 'react'
import PropTypes from 'prop-types'
import { campaignTypes, growthGradient, conversionsGradient } from '@/app/helpers/postsHelpers'

const PostSettingsTabs = ({ campaignType, setCampaignType, isDisabled }) => {
  return (
    <div className="flex mb-6 text-lg text-grey-3">
      {campaignTypes.map(({ title, slug }) => {
        const isActive = campaignType === slug
        return (
          <div
            key={slug}
            className={[
              'mr-5',
              isActive && ! isDisabled ? 'text-black' : null,
              isDisabled ? 'text-grey-2 pointer-events-none' : null,
            ].join(' ')}
          >
            <button
              type="button"
              className={[
                'flex items-center',
                isActive ? 'font-bold' : null,
                isDisabled ? 'saturate-0' : null,
              ].join(' ')}
              onClick={() => setCampaignType(slug)}
            >
              <span
                className="w-4 h-4 rounded-full mr-1"
                style={{
                  background: slug === 'all' ? growthGradient : conversionsGradient,
                }}
              />
              {title}
            </button>
          </div>
        )
      })}
    </div>
  )
}

PostSettingsTabs.propTypes = {
  campaignType: PropTypes.string.isRequired,
  setCampaignType: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
}

PostSettingsTabs.defaultProps = {
  isDisabled: false,

}

export default PostSettingsTabs
