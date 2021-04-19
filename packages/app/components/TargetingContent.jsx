import React from 'react'

import { useAsync } from 'react-async'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import Error from '@/elements/Error'

import TargetingNoDefaultLink from '@/app/TargetingNoDefaultLink'
import TargetingSummary from '@/app/TargetingSummary'
import TargetingSettings from '@/app/TargetingSettings'
import TargetingProgressButton from '@/app/TargetingProgressButton'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const fetchState = ({ artistId, currencyOffset }) => {
  return targetingHelpers.fetchTargetingState(artistId, currencyOffset)
}

const TargetingContent = () => {
  // DESTRUCTURE CONTEXTS
  const { artistId, artist: { missingDefaultLink } } = React.useContext(ArtistContext)
  const { toggleGlobalLoading, globalLoading } = React.useContext(InterfaceContext)
  // Fetch from targeting context
  const {
    targetingState,
    isDesktopLayout,
    initPage,
    errorFetchingSettings,
    errorUpdatingSettings,
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


  // GET CURRENT VIEW
  const { currentView, setIsAnimatingView } = React.useContext(TargetingContext)

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

  if (missingDefaultLink) return <TargetingNoDefaultLink />

  return (
    <>
      <div className="relative">
        {errorUpdatingSettings && (
          <div>
            <h3 className="text-red">
              <strong>Could not save settings</strong>
            </h3>
            <Error error={errorUpdatingSettings} />
          </div>
        )}
        {/* SECTIONS */}
        <SwitchTransition>
          <CSSTransition
            key={currentView}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', () => {
                done()
                setTimeout(() => {
                  setIsAnimatingView(false)
                }, 300)
              }, false)
            }}
            onExit={() => {
              setIsAnimatingView(true)
            }}
            classNames="fade"
          >
            {/* SUMMARY */}
            {currentView === 'summary' ? (
              <TargetingSummary />
            ) : (
              <TargetingSettings />
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
      {/* MOBILE PROGRESS BUTTON */}
      {!isDesktopLayout && (
        <TargetingProgressButton />
      )}
    </>
  )
}

// TargetingContent.propTypes = {

// }

export default TargetingContent
