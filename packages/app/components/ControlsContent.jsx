import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import SplitView from '@/app/SplitView'
import ObjectiveSettings from '@/app/ObjectiveSettings'
import TargetingBudget from '@/app/TargetingBudget'
import AdDefaults from '@/app/AdDefaults'
import TargetingSettings from '@/app/TargetingSettings'
import LinkBank from '@/app/LinkBank'
import IntegrationsPanel from '@/app/IntegrationsPanel'
import ProfileUsers from '@/app/ProfileUsers'

import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { UserContext } from '@/app/contexts/UserContext'

import copy from '@/app/copy/controlsPageCopy'
import * as ROUTES from '@/app/constants/routes'

// One of these components will be shown based on the activeSlug
const controlsComponents = {
  objective: <ObjectiveSettings />,
  budget: <TargetingBudget />,
  ads: <AdDefaults />,
  targeting: <TargetingSettings />,
  links: <LinkBank />,
  integrations: <IntegrationsPanel />,
  team: <ProfileUsers />,
}

const ControlsContent = ({ slug }) => {
  const { globalLoading } = React.useContext(InterfaceContext)
  const { user } = React.useContext(UserContext)
  const hasArtists = user.artists.length > 0
  const { controlsOptions } = copy

  // Fetch from targeting context
  const {
    errorFetchingSettings,
    initialTargetingState,
  } = React.useContext(TargetingContext)

  // Handle error
  if (errorFetchingSettings) {
    return (
      <div>
        <h3>Error fetching settings</h3>
        <Error error={errorFetchingSettings} />
      </div>
    )
  }

  if (globalLoading || (hasArtists && ! Object.keys(initialTargetingState).length > 0)) return <Spinner />

  return (
    <SplitView
      slug={slug}
      contentComponents={controlsComponents}
      options={controlsOptions}
      basePath={ROUTES.CONTROLS}
      hasEvenColumns
      className="md:grid grid-cols-12 gap-8"
    />
  )
}

ControlsContent.propTypes = {
  slug: PropTypes.string,
}

ControlsContent.defaultProps = {
  slug: '',
}

export default ControlsContent
