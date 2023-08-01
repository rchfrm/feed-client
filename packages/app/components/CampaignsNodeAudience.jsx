import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useSaveTargeting from '@/app/hooks/useSaveTargeting'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import CampaignsInterestsAlert from '@/app/CampaignsInterestsAlert'
import CampaignsNodeConnector from '@/app/CampaignsNodeConnector'
import HeartIcon from '@/icons/HeartIcon'
import UsersIcon from '@/icons/UsersIcon'
import PlusIcon from '@/icons/PlusIcon'
import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import brandColors from '@/constants/brandColors'
import MarkdownText from '@/elements/MarkdownText'

import { NODE_INDEXES } from '@/app/types/overview'

const CampaignsNodeAudience = ({
  group,
  node,
  onDragOver,
  onDrop,
  getPosition,
  isActive,
}) => {
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const { targetingState, initialTargetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings })

  const { handlers } = group
  const { label, subType, platforms } = node
  const nodeRef = React.useRef()
  const isCustomAudience = subType === 'custom'
  const isCreateAudience = subType === 'create'
  const isDesktopLayout = useBreakpointTest('xs')

  const icons = {
    facebook: <FacebookIcon className="h-4 w-auto" />,
    instagram: <InstagramIcon className="h-4 w-auto" />,
  }

  const handleClick = () => {
    setShouldShowAlert(true)
  }

  const onCancel = () => {
    setShouldShowAlert(false)
  }

  const onConfirm = async () => {
    await saveTargeting('', targetingState)
  }

  return (
    <div
      id={node.index}
      ref={nodeRef}
      className={[
        'w-full xs:w-52 p-1.5 z-10',
        'border-2 border-b-[6px] border-solid rounded-dialogue',
        'text-sm text-[#203578]',
        isDesktopLayout ? 'absolute' : 'relative mb-4',
        isCustomAudience
          ? isActive ? 'bg-gradient-2-light border-gradient-2-dark' : 'bg-white border-gradient-2-light text-gradient-2-dark'
          : isActive ? 'bg-gradient-1-light border-gradient-1-dark' : 'bg-white border-gradient-1-dark',
        isCreateAudience ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
      style={{
        top: isDesktopLayout ? node.position.y : null,
        left: isDesktopLayout ? node.position.x : null,
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={isCreateAudience ? handleClick : null}
      role="button"
    >
      {platforms.map((platform, index) => (
        <div
          key={platform}
          className="absolute -top-2 -left-2 h-4 w-4 bg-white rounded-[5px] z-10 overflow-hidden"
          style={{ left: `${(index - 1) * 8}px` }}
        >
          {icons[platform]}
        </div>
      ))}
      <div className="flex items-center">
        <div className={[
          'flex items-center justify-center flex-shrink-0',
          'w-8 h-[38px] mr-2',
          'rounded-dialogue',
          'border-2 border-solid',
          isCustomAudience
            ? isActive ? 'bg-gradient-2-dark' : 'border-2 border-solid border-gradient-2-light'
            : isActive ? 'bg-gradient-1-dark border-none' : 'bg-white border-gradient-1-dark',
        ].join(' ')}
        >
          {isCustomAudience ? (
            <HeartIcon fill={isActive ? brandColors.white : brandColors.gradient[2].light} className="h-5 w-auto" />
          ) : (
            isActive ? <UsersIcon fill="#FFF" className="h-5 w-auto" /> : <PlusIcon fill={brandColors.gradient[1].dark} className="h-5 w-auto" />
          )}
        </div>
        <MarkdownText markdown={label} className="text-xs mb-0" />
      </div>
      {handlers.map((handler) => (
        <CampaignsNodeConnector
          key={handler.position}
          id={group.id}
          handler={handler}
          nodeRef={nodeRef}
          getPosition={getPosition}
          className={[
            isCreateAudience ? null : 'pointer-events-none',
            isCustomAudience ? 'bg-gradient-2-dark' : 'bg-gradient-1-dark',
          ].join(' ')}
        />
      ))}
      {shouldShowAlert && (
        <CampaignsInterestsAlert
          shouldShowAlert={shouldShowAlert}
          setShouldShowAlert={setShouldShowAlert}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </div>
  )
}

CampaignsNodeAudience.propTypes = {
  group: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default CampaignsNodeAudience
