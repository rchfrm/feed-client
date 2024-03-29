import React from 'react'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import CampaignsNodeConnector from '@/app/CampaignsNodeConnector'
import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import CampaignsNodeCampaignHeader from '@/app/CampaignsNodeCampaignHeader'
import {
  IDENTIFIERS,
  OverviewNode,
  OverviewNodeEngageAdSet,
  OverviewNodeGroup,
  OverviewNodeGroupHandler,
  OverviewNodeTrafficAdSet,
} from '@/app/types/overview'
import { getCampaignType } from '@/app/helpers/campaignsHelpers'
import ArtistContext from '@/app/contexts/ArtistContext'
import { getCurrencySymbol } from '@/helpers/utils'

type CampaignsNodeCampaignProps = {
  group: OverviewNodeGroup
  node: OverviewNode
  onDragOver: React.DragEventHandler<HTMLDivElement>
  onDrop: React.DragEventHandler<HTMLDivElement>
  getPosition: (handler: OverviewNodeGroupHandler) => string
  isActive: boolean
}

const CampaignsNodeCampaign: React.FC<CampaignsNodeCampaignProps> = ({
  group,
  node,
  onDragOver,
  onDrop,
  getPosition,
  isActive,
}) => {
  const { artistCurency } = React.useContext(ArtistContext)
  const currencySymbol = getCurrencySymbol(artistCurency)
  const { handlers } = group
  const campaignType = getCampaignType(node.label as IDENTIFIERS)
  let resultRate: number | '--'
  let costPerResult: number | '--'
  let resultRateDescription: string
  let costPerResultDescription: string
  if (campaignType === 'engagement') {
    resultRate = (node as OverviewNodeEngageAdSet).engagementRate
    costPerResult = (node as OverviewNodeEngageAdSet).costPerEngagement
    resultRateDescription = 'eng. rate'
    costPerResultDescription = 'per eng.'
  } else {
    resultRate = (node as OverviewNodeTrafficAdSet).ctr
    costPerResult = (node as OverviewNodeTrafficAdSet).cpc
    resultRateDescription = 'click rate'
    costPerResultDescription = 'per click'
  }
  const nodeRef = React.useRef()
  const isDesktopLayout = useBreakpointTest('xs')
  const { targetingState: { platforms } } = React.useContext(TargetingContext)

  const icons = {
    facebook: <FacebookIcon className="h-4 w-auto" />,
    instagram: <InstagramIcon className="h-4 w-auto" />,
  }

  return (
    <div
      id={node.index}
      ref={nodeRef}
      className={[
        'w-full xs:w-36 z-10 cursor-default',
        'p-3 rounded-dialogue',
        isDesktopLayout ? 'absolute' : 'relative mb-4',
        isActive ? 'bg-green-bg-light' : 'bg-white border-solid border-2 border-green-dark',
      ].join(' ')}
      style={{
        top: isDesktopLayout ? node.position.y : null,
        left: isDesktopLayout ? node.position.x : null,
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      role="button"
    >
      {platforms?.map((platform) => (
        <div key={platform} className="absolute -top-2 -left-2 h-4 w-4 bg-white rounded-[5px] z-10 overflow-hidden">
          {icons[platform]}
        </div>
      ))}
      <div className={[
        'flex h-full text-sm gap-y-2',
        isActive ? 'flex-row xs:flex-col' : 'flex-col',
      ].join(' ')}
      >
        <>
          <CampaignsNodeCampaignHeader isActive={isActive} campaignType={campaignType} />
          <div className="flex gap-x-2">
            <div
              className={[
                'flex flex-col items-center xs:w-full text-xs p-1 rounded-dialogue',
                ! isActive ? 'bg-green-bg-light' : 'bg-green-bg-dark',
              ].join(' ')}
            >
              <div className="-mb-0.5 text-green-text text-xs -mb-1 font-bold">{resultRate}{resultRate !== '--' ? '%' : ''}</div>
              <div className="text-green-text text-[8px]">{resultRateDescription}</div>
            </div>
            <div
              className={[
                'flex flex-col items-center xs:w-full text-xs p-1 rounded-dialogue',
                ! isActive ? 'bg-green-bg-light' : 'bg-green-bg-dark',
              ].join(' ')}
            >
              <div className="-mb-0.5 text-green-text text-xs -mb-1 font-bold">{costPerResult !== '--' ? currencySymbol : ''}{costPerResult}</div>
              <div className="text-green-text text-[8px]">{costPerResultDescription}</div>
            </div>
          </div>
        </>
      </div>
      {handlers.map((handler) => (
        <CampaignsNodeConnector
          key={handler.position}
          id={group.id}
          handler={handler}
          nodeRef={nodeRef}
          getPosition={getPosition}
          className="pointer-events-none bg-green-bg-dark"
        />
      ))}
    </div>
  )
}

export default CampaignsNodeCampaign
