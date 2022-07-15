import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import useOpenPricingPlanUpgradeSidePanel from '@/app/hooks/useOpenPricingPlanUpgradeSidePanel'
import useHasOverflow from '@/app/hooks/useHasOverflow'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import LockIcon from '@/icons/LockIcon'
import MarkdownText from '@/elements/MarkdownText'

import brandColors from '@/constants/brandColors'
import * as ROUTES from '@/app/constants/routes'

import globalCopy from '@/app/copy/global'

const DisabledActionPrompt = ({
  version,
  copy,
  section,
  isButton,
  className,
}) => {
  const Wrapper = isButton ? 'button' : 'div'
  const isSmallSize = version === 'small'
  const hasBorder = version === 'border'

  const { artist: { hasSetUpProfile } } = React.useContext(ArtistContext)
  const openPricingPlanUpgradeSidePanel = useOpenPricingPlanUpgradeSidePanel()

  const ref = React.useRef()
  const hasOverflow = useHasOverflow(ref)
  const shouldSetHeight = !copy && version !== 'border' && hasSetUpProfile

  const onClick = () => {
    if (!isButton) return

    if (!hasSetUpProfile && section !== 'connect-accounts') {
      Router.push(ROUTES.GET_STARTED)

      return
    }

    openPricingPlanUpgradeSidePanel(section)
  }

  return (
    <Wrapper
      className={[
        'flex items-center',
        'text-left',
        shouldSetHeight ? 'h-5' : null,
        shouldSetHeight && isSmallSize ? 'h-4' : null,
        isButton ? 'underline' : null,
        isSmallSize ? 'text-xs' : null,
        hasBorder ? 'p-4 border-2 border-solid border-black rounded-dialogue' : null,
        className,
      ].join(' ')}
      onClick={onClick}
      ref={ref}
    >
      <LockIcon
        className={[isSmallSize ? 'w-3 h-3' : 'w-5 h-5', 'flex-shrink-0', '-mt-[3px]'].join(' ')}
        fill={brandColors.instagram.bg}
      />
      <MarkdownText
        markdown={copy || globalCopy.disabledReason(section, hasSetUpProfile, hasOverflow)}
        className={[isSmallSize ? 'mx-1' : 'mx-2', 'mb-0'].join(' ')}
      />
      {isButton && (
        <ArrowAltIcon
          className={[isSmallSize ? 'w-3 h-3' : 'w-5 h-5', 'flex-shrink-0'].join(' ')}
          direction="right"
          fill={brandColors.instagram.bg}
        />
      )}
    </Wrapper>
  )
}

DisabledActionPrompt.propTypes = {
  version: PropTypes.string,
  section: PropTypes.string,
  copy: PropTypes.string,
  isButton: PropTypes.bool,
  className: PropTypes.string,
}

DisabledActionPrompt.defaultProps = {
  version: 'regular',
  section: '',
  copy: '',
  isButton: true,
  className: null,
}

export default DisabledActionPrompt
