import React from 'react'
import PropTypes from 'prop-types'
import { Handle } from 'reactflow'
import HeartIcon from '@/icons/HeartIcon'
import ProfileIcon from '@/icons/ProfileIcon'
import InstagramIcon from '@/icons/InstagramIcon'

const CampaignsOverviewAudienceNode = ({
  id,
  data,
  sourcePosition,
  targetPosition,
}) => {
  const { target, label, audienceType } = data || {}
  const isCustomAudience = audienceType === 'custom'

  return (
    <div className={[
      'w-52 p-2',
      'text-sm rounded-dialogue',
      'border-solid border-2 border-b-4',
      'text-[#203578]',
      isCustomAudience ? 'bg-gradient-2-light border-gradient-2-dark' : 'bg-gradient-1-light border-gradient-1-dark',
      ].join(' ')}>
      <div className="absolute -top-2 -left-2 h-4 w-4 bg-white rounded-dialogue z-10">
        <InstagramIcon className="h-4 w-auto" />
      </div>
      <div className="flex">
        <div className={[
          'flex items-center justify-center',
          'w-14 h-10 mr-2',
          'rounded-dialogue',
          isCustomAudience ? 'bg-[#5B82FB]' : 'bg-gradient-1-dark',
          ].join(' ')}>
            {isCustomAudience ? (
              <HeartIcon fill="#FFF" className="h-5 w-auto" />
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
  );
}

CampaignsOverviewAudienceNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  sourcePosition: PropTypes.string.isRequired,
  targetPosition: PropTypes.string.isRequired,
}

CampaignsOverviewAudienceNode.defaultProps = {
  data: null,
}

export default CampaignsOverviewAudienceNode
