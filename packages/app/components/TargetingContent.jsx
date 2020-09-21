import React from 'react'

import { useAsync } from 'react-async'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import Error from '@/elements/Error'

import TargetingSummary from '@/app/TargetingSummary'
import TargetingSettings from '@/app/TargetingSettings'
import TargetingProgressButton from '@/app/TargetingProgressButton'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const fetchState = ({ artistId }) => {
  return targetingHelpers.fetchTargetingState(artistId)
}

const TargetingContent = () => {
  // DESTRUCTURE CONTEXTS
  const { artistId } = React.useContext(ArtistContext)
  const { toggleGlobalLoading, globalLoading } = React.useContext(InterfaceContext)
  // Fetch from targeting context
  const {
    targetingState,
    isDesktopLayout,
    initPage,
  } = React.useContext(TargetingContext)

  // LOAD AND SET INITIAL TARGETING STATE
  const [error, setError] = React.useState(null)
  const { isPending } = useAsync({
    promiseFn: fetchState,
    watch: artistId,
    // The variable(s) to pass to promiseFn
    artistId,
    // When fetch finishes
    onResolve: (state) => {
      toggleGlobalLoading(false)
      initPage(state)
    },
    // Handle errors
    onReject(error) {
      setError(error)
    },
  })

  // RESET STATES WHEN ARTIST CHANGES
  React.useEffect(() => {
    setError(null)
  }, [artistId])


  // GET CURRENT VIEW
  const { currentView, setIsAnimatingView } = React.useContext(TargetingContext)

  // Handle error
  if (error && !isPending) {
    return <Error error={error} />
  }

  if (globalLoading || !Object.keys(targetingState).length) return null

  return (
    <>
      <div className="relative">
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
