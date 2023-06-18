import React from 'react'
import PropTypes from 'prop-types'
import { Handle } from 'reactflow'
import HeartIcon from '@/icons/HeartIcon'
import ProfileIcon from '@/icons/ProfileIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import brandColors from '@/constants/brandColors'

const CampaignsOverviewAudienceNode = ({
  id,
  data,
  sourcePosition,
  targetPosition,
}) => {
  const { target, label, audienceType, isActive } = data || {}
  const isCustomAudience = audienceType === 'custom'

  return (
    <div className={[
      'w-52 p-2',
      'text-sm rounded-dialogue',
      'border-solid border-2 border-b-4',
      'text-[#203578]',
      isCustomAudience
        ? isActive ? 'bg-gradient-2-light border-gradient-2-dark' : 'bg-white border-gradient-2-light text-gradient-2-dark'
        : 'bg-gradient-1-light border-gradient-1-dark',
    ].join(' ')}
    >
      <div className="absolute -top-2 -left-2 h-4 w-4 bg-white rounded-dialogue z-10">
        <InstagramIcon className="h-4 w-auto" />
      </div>
      <div className="flex">
        <div className={[
          'flex items-center justify-center',
          'w-14 h-10 mr-2',
          'rounded-dialogue',
          isCustomAudience
            ? isActive ? 'bg-gradient-2-dark' : 'border-2 border-solid border-gradient-2-light'
            : 'bg-gradient-1-dark',
        ].join(' ')}
        >
          {isCustomAudience ? (
            <HeartIcon fill={isActive ? brandColors.white : brandColors.gradient[2].light} className="h-5 w-auto" />
          ) : (
            <ProfileIcon fill="#FFF" className="h-6 w-auto" />
          )}
        </div>
        <div>{label}</div>
      </div>
      {sourcePosition !== 'hidden' && (
        <Handle
          type="source"
          id={`source-${id}`}
          position={sourcePosition}
          isValidConnection={(connection) => connection.target === target}
          className="w-16"
        />
      )}
      {targetPosition !== 'hidden' && (
        <Handle
          type="target"
          id={`target-${id}`}
          position={targetPosition}
          className="w-16"
        />
      )}
    </div>
  )
}

CampaignsOverviewAudienceNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object,
  sourcePosition: PropTypes.string.isRequired,
  targetPosition: PropTypes.string.isRequired,
}

CampaignsOverviewAudienceNode.defaultProps = {
  data: null,
}

export default CampaignsOverviewAudienceNode
