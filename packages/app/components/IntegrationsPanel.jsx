import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import CaretIcon from '@/icons/CaretIcon'

import IntegrationsPanelIntegration from '@/app/IntegrationsPanelIntegration'
import DisabledSection from '@/app/DisabledSection'

import { dummyIntegrations } from '@/helpers/integrationHelpers'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/integrationsCopy'

const IntegrationsPanel = ({
  goBack,
  location,
}) => {
  const {
    artistId,
    artist: {
      integrations: artistIntegrations,
      hasSetUpProfile,
    },
    setArtist,
  } = React.useContext(ArtistContext)

  const integrations = hasSetUpProfile ? artistIntegrations : dummyIntegrations

  return (
    <section>
      <h2>Integrations</h2>
      <DisabledSection section="integrations" isDisabled={! hasSetUpProfile}>
        <MarkdownText markdown={copy.sidepanelIntro} className="mb-8" />
        <ul className="sm:grid grid-cols-2 gap-4">
          {integrations.map((integration) => {
            const { hidden } = integration
            if (hidden) return null
            return (
              <IntegrationsPanelIntegration
                key={integration.platform}
                artistId={artistId}
                integration={integration}
                setArtist={setArtist}
                location={location}
                isDisabled={! hasSetUpProfile}
                className="mb-8 mr-8 sm:mb-0 sm:mr-0 last:mb-0"
              />
            )
          })}
        </ul>
        {goBack && (
          <div className="mt-10">
            <Button
              version="x-small black icon"
              className="mr-5"
              onClick={goBack}
              trackComponentName="IntegrationsPanel"
            >
              <CaretIcon
                fill={brandColors.offwhite}
                direction="left"
                style={{ width: '0.5rem' }}
              />
              Back
            </Button>
          </div>
        )}
      </DisabledSection>
    </section>
  )
}

IntegrationsPanel.propTypes = {
  goBack: PropTypes.func,
  location: PropTypes.string,
}

IntegrationsPanel.defaultProps = {
  goBack: null,
  location: 'insights',
}


export default IntegrationsPanel
