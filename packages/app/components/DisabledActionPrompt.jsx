import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import useOpenPricingPlanUpgradeSidePanel from '@/app/hooks/useOpenPricingPlanUpgradeSidePanel'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import LockIcon from '@/icons/LockIcon'
import MarkdownText from '@/elements/MarkdownText'

import brandColors from '@/constants/brandColors'
import * as ROUTES from '@/app/constants/routes'

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

  const onClick = () => {
    if (!isButton) return

    if (!hasSetUpProfile) {
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
        isButton ? 'underline' : null,
        isSmallSize ? 'text-xs' : null,
        hasBorder ? 'p-4 border-2 border-solid border-black rounded-dialogue' : null,
        className,
      ].join(' ')}
      onClick={onClick}
    >
      <LockIcon
        className={[isSmallSize ? 'w-3 h-3' : 'w-5 h-5', 'flex-shrink-0'].join(' ')}
        fill={brandColors.instagram.bg}
      />
      <MarkdownText markdown={copy} className={[isSmallSize ? 'mx-1' : 'mx-3', 'mb-0'].join(' ')} />
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
  copy: PropTypes.string.isRequired,
  section: PropTypes.string,
  isButton: PropTypes.bool,
  className: PropTypes.string,
}

DisabledActionPrompt.defaultProps = {
  version: 'regular',
  section: '',
  isButton: true,
  className: null,
}

export default DisabledActionPrompt
