import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/contexts/ArtistContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowIcon from '@/icons/ArrowIcon'

import IntegrationsPanelIntegration from '@/app/IntegrationsPanelIntegration'

import sidePanelStyles from '@/app/SidePanel.module.css'
import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/integrationsCopy'

const IntegrationsPanel = ({
  goBack,
}) => {
  const {
    artistId,
    artist: {
      integrations,
    },
    setArtist,
  } = React.useContext(ArtistContext)

  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Integrations</h2>
      <MarkdownText markdown={copy.sidepanelIntro} className="mb-8" />
      <ul className="sm:grid grid-cols-2 gap-8">
        {integrations.map((integration) => {
          const { hidden } = integration
          if (hidden) return null
          return (
            <IntegrationsPanelIntegration
              key={integration.platform}
              artistId={artistId}
              integration={integration}
              setArtist={setArtist}
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
          >
            <ArrowIcon
              fill={brandColors.bgColor}
              direction="left"
              style={{ width: '0.5rem' }}
            />
            Back
          </Button>
        </div>
      )}
    </section>
  )
}

IntegrationsPanel.propTypes = {
  goBack: PropTypes.func,
}

IntegrationsPanel.defaultProps = {
  goBack: null,
}


export default IntegrationsPanel
