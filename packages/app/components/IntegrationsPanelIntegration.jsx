import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'
import ButtonPill from '@/elements/ButtonPill'

import brandColors from '@/constants/brandColors'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useEditIntegration from '@/app/hooks/useEditIntegration'

const IntegrationsPanelIntegration = ({ integration, className }) => {
  const { title, platform, accountId, color } = integration
  const isPopulated = !!accountId
  const backgroundColor = isPopulated ? color.bg : brandColors.bgColor
  const borderColor = isPopulated ? color.bg : brandColors.textColor
  const textColor = isPopulated ? color.text : brandColors.greyDark
  const iconFill = isPopulated ? color.text : color.bg
  const buttonText = isPopulated ? accountId : `Connect ${title}`
  // EDIT FUNCTION
  const action = isPopulated ? 'delete' : 'add'
  const updateIntegration = useEditIntegration({})
  // GET BUTTON SIZE
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
        onClick={() => {
          updateIntegration(integration, action)
        }}
        style={{
          backgroundColor,
          color: textColor,
          border: `2px solid ${borderColor}`,
        }}
        hasIcon
        active={isPopulated}
      >
        <PlatformIcon
          platform={platform}
          className="mr-5"
          title={title}
          fill={iconFill}
        />
        {buttonText}
      </ButtonPill>
    </li>
  )
}

IntegrationsPanelIntegration.propTypes = {
  integration: PropTypes.object.isRequired,
  className: PropTypes.string,
}

IntegrationsPanelIntegration.defaultProps = {
  className: null,
}


export default IntegrationsPanelIntegration
