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
        'relative w-full xs:w-52 p-1.5 z-10',
        isAudience ? 'p-1.5 border-2 border-b-[6px] border-solid border-gradient-2-dark bg-gradient-2-light' : 'px-3 py-1.5 bg-green-bg-light border-l-2 border-solid border-black',
        'rounded-dialogue',
        'text-sm',
        'bg-gradient-2-light',
        className,
      ].join(' ')}
    >
      {! isAudience && (
        <>
          <div className="absolute top-0 w-0 h-0 right-0 border-r-white border-t-0 border-r-[32px] border-b-[30px] border-l-0 border-solid border-l-transparent border-b-transparent border-t-transparent" />
          <div className="scale-y-[-1] absolute bottom-0 w-0 h-0 right-0 border-r-white border-t-0 border-r-[32px] border-b-[30px] border-l-0 border-solid border-l-transparent border-b-transparent border-t-transparent" />
        </>
      )}
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
        <MarkdownText markdown={label} className={[isAudience ? 'text-xs' : 'font-bold', 'mb-0'].join(' ')} />
      </div>
    </div>
  )
}

export default CampaigNode
