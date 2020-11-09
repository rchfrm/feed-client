import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'
import ButtonPill from '@/elements/ButtonPill'

import brandColors from '@/constants/brandColors'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useEditIntegration from '@/app/hooks/useEditIntegration'

import * as integrationHelpers from '@/app/helpers/integrationHelpers'

const IntegrationsPanelIntegration = ({
  integration,
  artistId,
  isMusician,
  updateIntegrations,
  className,
}) => {
  const { title, platform, accountId, color } = integration
  const isPopulated = !!accountId
  const backgroundColor = isPopulated ? color.bg : brandColors.bgColor
  const borderColor = isPopulated ? color.bg : brandColors.textColor
  const textColor = isPopulated ? color.text : brandColors.textColor
  const iconFill = isPopulated ? color.text : color.bg
  const buttonText = isPopulated ? `${title} connected` : `Connect ${title}`
  // EDIT FUNCTION
  const action = isPopulated ? 'delete' : 'add'
  const updateIntegration = useEditIntegration({
    artistId,
    onSuccess: (updatedArtist) => {
      const { integrations } = updatedArtist
      const formattedIntegrations = integrationHelpers.formatAndFilterIntegrations(integrations, isMusician)
      console.log('formattedIntegrations', formattedIntegrations)
      updateIntegrations(formattedIntegrations)
    },
  })
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
  artistId: PropTypes.string.isRequired,
  isMusician: PropTypes.bool.isRequired,
  updateIntegrations: PropTypes.func.isRequired,
  className: PropTypes.string,
}

IntegrationsPanelIntegration.defaultProps = {
  className: null,
}


export default IntegrationsPanelIntegration
