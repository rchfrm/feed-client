import React from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async'

import Error from '@/elements/Error'

import ControlsContentOptions from '@/app/ControlsContentOptions'
import ControlsContentView from '@/app/ControlsContentView'
import ConversionsContent from '@/app/ConversionsContent'
import TargetingBudgetBox from '@/app/TargetingBudgetBox'
import IntegrationsPanel from '@/app/IntegrationsPanel'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const fetchState = ({ artistId, currencyOffset }) => {
  return targetingHelpers.fetchTargetingState(artistId, currencyOffset)
}

// One of these components will be shown based on the activeSlug
const controlsComponents = {
  targeting: <h2>Targeting</h2>,
  links: <h2>Link bank</h2>,
  integrations: <IntegrationsPanel />,
  ads: <h2>Ad Defaults</h2>,
  conversions: <ConversionsContent />,
}

const ControlsAll = ({ activeSlug }) => {
  // DESTRUCTURE CONTEXTS
  const { artistId } = React.useContext(ArtistContext)
  const { toggleGlobalLoading, globalLoading } = React.useContext(InterfaceContext)
  // Fetch from targeting context
  const {
    targetingState,
    isDesktopLayout,
    initPage,
    errorFetchingSettings,
    currencyOffset,
  } = React.useContext(TargetingContext)

  // LOAD AND SET INITIAL TARGETING STATE
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

  if (globalLoading || !Object.keys(targetingState).length) return null

  return (
    <div className="md:grid grid-cols-12 gap-8">
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
    </div>
  )
}

ControlsAll.propTypes = {
  activeSlug: PropTypes.string,
}

ControlsAll.defaultProps = {
  activeSlug: '',
}

export default ControlsAll
