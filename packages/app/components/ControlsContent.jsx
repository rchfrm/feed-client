import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import ControlsWizard from '@/app/ControlsWizard'
import ControlsContentOptions from '@/app/ControlsContentOptions'
import ControlsContentView from '@/app/ControlsContentView'
import ConversionsContent from '@/app/ConversionsContent'
import TargetingBudgetBox from '@/app/TargetingBudgetBox'
import TargetingSettings from '@/app/TargetingSettings'
import IntegrationsPanel from '@/app/IntegrationsPanel'
import LinkBank from '@/app/LinkBank'
import AdDefaults from '@/app/AdDefaults'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import useControlsWizard from '@/app/hooks/useControlsWizard'

// One of these components will be shown based on the activeSlug
const controlsComponents = {
  targeting: <TargetingSettings />,
  links: <LinkBank />,
  integrations: <IntegrationsPanel />,
  ads: <AdDefaults />,
  conversions: <ConversionsContent />,
}

const ControlsContent = ({ activeSlug }) => {
  const [isWizardActive, setIsWizardActive] = React.useState(false)

  const {
    hasSetUpControls,
    isLoading,
    adAccountId,
    locations,
    defaultLinkId,
    budget,
    defaultPaymentMethod,
    isProfilePartOfOrganisation,
  } = useControlsWizard()

  // Destructure context
  const { globalLoading } = React.useContext(InterfaceContext)
  const { artistId } = React.useContext(ArtistContext)

  // Fetch from targeting context
  const {
    targetingState,
    isDesktopLayout,
    errorFetchingSettings,
  } = React.useContext(TargetingContext)

  React.useEffect(() => {
    setIsWizardActive(false)
  }, [artistId])

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
      {!hasSetUpControls || isWizardActive ? (
        <div className="col-span-6 col-start-1">
          <ControlsWizard
            setIsWizardActive={setIsWizardActive}
            defaultLinkId={defaultLinkId}
            locations={locations}
            adAccountId={adAccountId}
            budget={budget}
            defaultPaymentMethod={defaultPaymentMethod}
            isProfilePartOfOrganisation={isProfilePartOfOrganisation}
          />
        </div>
      ) : (
        <>
          <div className="col-span-6 col-start-1">
            <h2>Budget</h2>
            {/* BUDGET BOX */}
            <TargetingBudgetBox
              className="mb-8"
            />
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
        </>
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
