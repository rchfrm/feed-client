import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PlatformIcon from '@/icons/PlatformIcon'
import ChainLinkedIcon from '@/icons/ChainLinkedIcon'
import ChainUnlinkedIcon from '@/icons/ChainUnlinkedIcon'
import ButtonPill from '@/elements/ButtonPill'

import brandColors from '@/constants/brandColors'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useEditIntegration from '@/app/hooks/useEditIntegration'
import useControlsStore from '@/app/stores/controlsStore'

import { formatAndFilterIntegrations } from '@/helpers/integrationHelpers'
import { handleTikTokAuthRedirect } from '@/app/helpers/tikTokHelpers'

import * as ROUTES from '@/app/constants/routes'

const getControlsStoreState = (state) => ({
  fetchAndUpdateLinks: state.fetchAndUpdateLinks,
})

const IntegrationsPanelIntegration = ({
  integration,
  artistId,
  setArtist,
  location,
  isDisabled,
  className,
}) => {
  const { title, platform, accountId, color } = integration
  const isPopulated = !!accountId
  const backgroundColor = isPopulated ? color.bg : brandColors.bgColor
  const borderColor = isPopulated ? color.bg : brandColors.textColor
  const textColor = isPopulated ? color.text : brandColors.textColor
  const iconFill = isPopulated ? color.text : color.bg
  const ChainIcon = isPopulated ? ChainLinkedIcon : ChainUnlinkedIcon

  const { fetchAndUpdateLinks } = useControlsStore(getControlsStoreState)

  const { artist } = React.useContext(ArtistContext)

  // EDIT FUNCTION
  const action = isPopulated ? 'delete' : 'add'

  const updateIntegration = useEditIntegration({
    artistId,
    location,
    onSuccess: async (updatedArtist) => {
      const { integrations } = updatedArtist

      setArtist({
        type: 'update-integrations',
        payload: {
          integrations,
        },
      })

      const updatedIntegrations = formatAndFilterIntegrations(integrations)
      const artistWithFormattedIntegrations = { ...artist, integrations: updatedIntegrations }
      await fetchAndUpdateLinks(artistWithFormattedIntegrations)
    },
  })

  const handleClick = () => {
    if (platform === 'tiktok' && !isPopulated) {
      handleTikTokAuthRedirect(ROUTES.CONTROLS)
      return
    }
    updateIntegration(integration, action)
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
        onClick={handleClick}
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
        <ChainIcon
          className="flex-shrink-0 ml-2"
          fill={isPopulated ? brandColors.white : brandColors.textColor}
        />
      </ButtonPill>
    </li>
  )
}

IntegrationsPanelIntegration.propTypes = {
  integration: PropTypes.object.isRequired,
  artistId: PropTypes.string.isRequired,
  setArtist: PropTypes.func.isRequired,
  location: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

IntegrationsPanelIntegration.defaultProps = {
  location: 'insights',
  className: null,
}


export default IntegrationsPanelIntegration
