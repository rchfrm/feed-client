import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'
import ChainLinkedIcon from '@/icons/ChainLinkedIcon'
import ChainUnlinkedIcon from '@/icons/ChainUnlinkedIcon'
import ButtonPill from '@/elements/ButtonPill'

import brandColors from '@/constants/brandColors'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const IntegrationsPanelTikTokIntegration = ({
  integration,
  isDisabled,
  className,
}) => {
  const { title, platform, accountId, color } = integration
  const isPopulated = !!accountId
  const backgroundColor = isPopulated ? color.bg : brandColors.bgColor
  const borderColor = isPopulated ? color.bg : brandColors.textColor
  const textColor = isPopulated ? color.text : brandColors.textColor
  const iconFill = isPopulated ? color.text : color.bg

  const updateIntegration = () => {
    console.log('Click')
  }

  const useLargeButtons = useBreakpointTest('xs')

  return (
    <li
      className={[
        className,
      ].join(' ')}
    >
      <ButtonPill
        className={['w-full'].join(' ')}
        size={useLargeButtons ? 'x-large' : 'large'}
        onClick={updateIntegration}
        style={{
          backgroundColor: isPopulated && isDisabled ? brandColors.grey : backgroundColor,
          color: textColor,
          border: `2px solid ${isDisabled ? brandColors.grey : borderColor}`,
        }}
        hasIcon
        active={isPopulated}
        trackComponentName="IntegrationsPanelIntegration"
      >
        <PlatformIcon
          platform={platform}
          className="flex-shrink-0 mr-2"
          title={title}
          fill={iconFill}
        />
        {title}
        {isPopulated ? (
          <ChainLinkedIcon
            className="flex-shrink-0 ml-2"
            fill={brandColors.white}
          />
        ) : (
          <ChainUnlinkedIcon
            className="flex-shrink-0 ml-2"
            fill={brandColors.textColor}
          />
        )}
      </ButtonPill>
    </li>
  )
}

IntegrationsPanelTikTokIntegration.propTypes = {
  integration: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

IntegrationsPanelTikTokIntegration.defaultProps = {
  className: null,
}


export default IntegrationsPanelTikTokIntegration
