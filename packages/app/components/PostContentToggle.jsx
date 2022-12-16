import React from 'react'
import PropTypes from 'prop-types'
import PostContentLabel from '@/app/PostContentLabel'
import PostToggle from '@/app/PostToggle'
import { growthGradient, conversionsGradient } from '@/app/helpers/postsHelpers'

const PostContentToggle = ({
  campaignType,
  post,
  setPost,
  isEnabled,
  setIsEnabled,
  isActive,
  disabled,
  className,
  hasSalesObjective,
}) => {
  const isConversionsCampaign = campaignType === 'conversions'

  return (
    <div
      className={[
        'relative w-full',
        'flex justify-between items-center',
        'rounded-dialogue',
        'py-2 px-4 mb-2 last:mb-10 border-2 border-solid border-grey-3',
        className,
      ].join(' ')}
    >
      <div className="mb-0 flex items-center">
        <div
          className={[
            'w-4 h-4 rounded-full',
            disabled ? 'opacity-50' : 'opacity-100',
          ].join(' ')}
          style={{
            background: ! isConversionsCampaign ? growthGradient : conversionsGradient,
          }}
        />
        <strong
          className="capitalize ml-4"
          style={{ transform: 'translate(-1px, 0px)' }}
        >
          {! isConversionsCampaign ? hasSalesObjective ? 'Grow & Nurture' : 'Promotable' : 'Sales'}
        </strong>
        {isActive && (
          <PostContentLabel
            copy="running"
            campaignType={campaignType}
          />
        )}
      </div>
      <PostToggle
        campaignType={campaignType}
        post={post}
        setPost={setPost}
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        disabled={disabled}
      />
    </div>
  )
}

PostContentToggle.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
  setIsEnabled: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  hasSalesObjective: PropTypes.bool.isRequired,
}

PostContentToggle.defaultProps = {
  disabled: false,
  className: null,
  isEnabled: false,
  isActive: false,
}

export default PostContentToggle
