import React from 'react'
import brandColors from '@/constants/brandColors'
import MarkdownText from '@/elements/MarkdownText'
import HeartIcon from '@/icons/HeartIcon'

interface CampaigNodeProps {
  type: string
  label: string
  className?: string
}

const CampaigNode: React.FC<CampaigNodeProps> = ({ type, label, className }) => {
  const isAudience = type === 'audience'

  return (
    <div
      className={[
        'w-full xs:w-52 p-1.5 z-10',
        isAudience ? 'border-2 border-b-[6px] border-solid border-gradient-2-dark bg-gradient-2-light' : 'bg-green-bg-light',
        'rounded-dialogue',
        'text-sm',
        'bg-gradient-2-light',
        className,
      ].join(' ')}
    >
      <div className="flex items-center">
        <div className={[
          'flex items-center justify-center flex-shrink-0',
          'w-8 h-[38px] mr-2',
          'rounded-dialogue',
          isAudience ? 'bg-gradient-2-dark' : 'bg-green',
        ].join(' ')}
        >
          <HeartIcon fill={brandColors.white} className="h-5 w-auto" />
        </div>
        <MarkdownText markdown={label} className={[isAudience ? 'text-xs' : null, 'mb-0'].join(' ')} />
      </div>
    </div>
  )
}

export default CampaigNode
