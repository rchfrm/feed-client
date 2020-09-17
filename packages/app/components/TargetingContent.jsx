import React from 'react'

import { useAsync } from 'react-async'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import Error from '@/elements/Error'

import TargetingSummary from '@/app/TargetingSummary'
import TargetingSettings from '@/app/TargetingSettings'
import TargetingBudgetDesktop from '@/app/TargetingBudgetDesktop'
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
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  // Fetch from targeting context
  const { targetingState, setTargetingState, isDesktopLayout } = React.useContext(TargetingContext)

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
      setTargetingState(state)
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

  // Desktop Budget anchor
  const containerRef = React.useRef(null)
  const columnRef = React.useRef(null)

  console.log('isDesktopLayout', isDesktopLayout)

  // Handle error
  if (error && !isPending) {
    return <Error error={error} />
  }

  if (!Object.keys(targetingState).length) return null

  return (
    <div ref={containerRef}>
      <div className="md:w-1/2 relative">
        {/* Anchor for resizing desktop budget */}
        <div
          ref={columnRef}
          className="absolute top-0 left-0 h-5 w-full invisible bg-red pointer-events-none"
        />
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
      {/* DESKTOP BUDGET SETTER */}
      {isDesktopLayout && (
        <TargetingBudgetDesktop
          containerRef={containerRef}
          columnRef={columnRef}
        />
      )}
      {/* MOBILE PROGRESS BUTTON */}
      {!isDesktopLayout && (
        <TargetingProgressButton />
      )}
    </div>
  )
}

// TargetingContent.propTypes = {

// }

export default TargetingContent
