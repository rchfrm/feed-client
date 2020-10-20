import React from 'react'
// import PropTypes from 'prop-types'

import { ArtistContext } from '@/contexts/ArtistContext'

import IntegrationsPanelIntegration from '@/app/IntegrationsPanelIntegration'

import * as integrationHelpers from '@/app/helpers/integrationHelpers'
import { testIfMusician } from '@/app/helpers/artistHelpers'

import sidePanelStyles from '@/app/SidePanel.module.css'

const IntegrationsPanel = ({}) => {
  const {
    artistId,
    artist: {
      category_list: artistCategories,
    },
  } = React.useContext(ArtistContext)

  const integrations = integrationHelpers.dummyIntegrations

  // IS ARTIST MUSICIAN
  const isMusician = React.useMemo(() => {
    return testIfMusician(artistCategories)
  // eslint-disable-next-line
  }, [artistId])

  // REMOVE NON-MUSICIAN INTEGRATIONS if necessary
  // and ADD EXTRA INFO
  const integrationsFormatted = React.useMemo(() => {
    console.log('integrations', integrations)
    return integrationHelpers.formatAndFilterIntegrations(integrations, isMusician)
  // eslint-disable-next-line
  }, [artistId])


  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Integrations</h2>
      <ul>
        {integrationsFormatted.map((integration) => {
          return (
            <IntegrationsPanelIntegration
              integration={integration}
              key={integration.platform}
            />
          )
        })}
      </ul>
    </section>
  )
}

IntegrationsPanel.propTypes = {

}

export default IntegrationsPanel
