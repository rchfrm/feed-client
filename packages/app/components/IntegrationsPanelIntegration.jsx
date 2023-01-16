import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

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
  const isPopulated = !! accountId
  const backgroundColor = isPopulated ? color.bg : brandColors.offwhite
  const borderColor = isPopulated ? color.bg : brandColors.black
  const textColor = isPopulated ? color.text : brandColors.black
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
    if (platform === 'tiktok' && ! isPopulated) {
      handleTikTokAuthRedirect(ROUTES.CONTROLS_INTEGRATIONS)
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
        isCentered={false}
      >
        <ChainIcon
          className="flex-shrink-0 ml-2"
          fill={isPopulated ? textColor : brandColors.black}
        />
        {title}
        <div className="w-5 mx-2 invisible" />
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
