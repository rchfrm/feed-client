import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/contexts/ArtistContext'

import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'

import IntegrationsPanelIntegration from '@/app/IntegrationsPanelIntegration'

import * as integrationHelpers from '@/app/helpers/integrationHelpers'
import { testIfMusician } from '@/app/helpers/artistHelpers'

import sidePanelStyles from '@/app/SidePanel.module.css'
import brandColors from '@/constants/brandColors'

const IntegrationsPanel = ({
  goBack,
}) => {
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
    return integrationHelpers.formatAndFilterIntegrations(integrations, isMusician)
  // eslint-disable-next-line
  }, [artistId])


  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Integrations</h2>
      <ul className="sm:grid grid-cols-2 gap-8">
        {integrationsFormatted.map((integration) => {
          return (
            <IntegrationsPanelIntegration
              key={integration.platform}
              integration={integration}
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
