import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import ControlsContentOptions from '@/app/ControlsContentOptions'
import ControlsContentView from '@/app/ControlsContentView'
import ObjectiveSettings from '@/app/ObjectiveSettings'
import TargetingBudgetBox from '@/app/TargetingBudgetBox'
import AdDefaults from '@/app/AdDefaults'
import TargetingSettings from '@/app/TargetingSettings'
import LinkBank from '@/app/LinkBank'
import IntegrationsPanel from '@/app/IntegrationsPanel'

import { InterfaceContext } from '@/contexts/InterfaceContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import useGetStartedWizard from '@/app/hooks/useGetStartedWizard'

// One of these components will be shown based on the activeSlug
const controlsComponents = {
  objective: <ObjectiveSettings />,
  budget: <TargetingBudgetBox />,
  ads: <AdDefaults />,
  targeting: <TargetingSettings />,
  links: <LinkBank />,
  integrations: <IntegrationsPanel />,
}

const ControlsContent = ({ activeSlug }) => {
  const {
    isLoading,
  } = useGetStartedWizard()

  // Destructure context
  const { globalLoading } = React.useContext(InterfaceContext)

  // Fetch from targeting context
  const {
    targetingState,
    isDesktopLayout,
    errorFetchingSettings,
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

  if (!Object.keys(targetingState).length > 0) return null
  if (globalLoading || isLoading) return <Spinner />

  return (
    <div className="md:grid grid-cols-12 gap-8">
      <div className="col-span-6 col-start-1">
        {/* SETTINGS MENU */}
        <ControlsContentOptions
          activeSlug={activeSlug}
          controlsComponents={controlsComponents}
        />
      </div>
      {/* SETTINGS VIEW */}
      {isDesktopLayout && (
        <ControlsContentView
          activeSlug={activeSlug}
          className="col-span-6 col-start-7"
          controlsComponents={controlsComponents}
        />
      )}
    </div>
  )
}

ControlsContent.propTypes = {
  activeSlug: PropTypes.string,
}

ControlsContent.defaultProps = {
  activeSlug: '',
}

export default ControlsContent
