import React from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async'

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
import { UserContext } from '@/app/contexts/UserContext'

import useBillingStore from '@/app/stores/billingStore'
import useControlsStore from '@/app/stores/controlsStore'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const fetchState = ({ artistId, currencyOffset }) => {
  return targetingHelpers.fetchTargetingState(artistId, currencyOffset)
}

const getBillingStoreState = (state) => ({
  setupBilling: state.setupBilling,
  defaultPaymentMethod: state.defaultPaymentMethod,
  loading: state.loading,
})

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  budget: state.budget,
})

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
  // Destructure context
  const { user } = React.useContext(UserContext)
  const { artistId, artistLoading, artist: { min_daily_budget_info } } = React.useContext(ArtistContext)
  const { toggleGlobalLoading, globalLoading } = React.useContext(InterfaceContext)
  // Fetch from targeting context
  const {
    targetingState,
    isDesktopLayout,
    initPage,
    errorFetchingSettings,
    currencyOffset,
  } = React.useContext(TargetingContext)

  // Get store values
  const { setupBilling, defaultPaymentMethod, loading: billingLoading } = useBillingStore(getBillingStoreState)
  const { postsPreferences, budget } = useControlsStore(getControlsStoreState)
  const { defaultLinkId, defaultPromotionEnabled } = postsPreferences

  const hasSetUpControls = Boolean(defaultLinkId
    && budget
    && defaultPaymentMethod)

  // Set-up billing store
  React.useEffect(() => {
    if (artistLoading) return
    const { currency: artistCurrency } = min_daily_budget_info || {}
    setupBilling({ user, artistCurrency, shouldFetchOrganisationDetailsOnly: true })
  // eslint-disable-next-line
  }, [artistLoading, user, setupBilling])

  // Load and set initial targeting state
  const { isPending } = useAsync({
    promiseFn: fetchState,
    watch: artistId,
    // The variable(s) to pass to promiseFn
    artistId,
    currencyOffset,
    // When fetch finishes
    onResolve: (state) => {
      const { error } = state
      toggleGlobalLoading(false)
      initPage(state, error)
    },
  })

  // Handle error
  if (errorFetchingSettings && !isPending) {
    return (
      <div>
        <h3>Error fetching settings</h3>
        <Error error={errorFetchingSettings} />
      </div>
    )
  }

  if (!Object.keys(targetingState)) return null
  if (globalLoading || billingLoading) return <Spinner />

  return (
    <div className="md:grid grid-cols-12 gap-8">
      {!hasSetUpControls || isWizardActive ? (
        <div className="col-span-6 col-start-1">
          <ControlsWizard
            setIsWizardActive={setIsWizardActive}
            defaultLinkId={defaultLinkId}
            defaultPromotionEnabled={defaultPromotionEnabled}
            budget={budget}
            defaultPaymentMethod={defaultPaymentMethod}
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
