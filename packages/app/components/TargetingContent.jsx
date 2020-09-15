import React from 'react'

import { SwitchTransition, CSSTransition } from 'react-transition-group'
// import PropTypes from 'prop-types'

import TargetingSummary from '@/app/TargetingSummary'
import TargetingSettings from '@/app/TargetingSettings'
import TargetingProgressButton from '@/app/TargetingProgressButton'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingContent = () => {
  // STOP GLOBAL LOADING WHEN ARTIST IS READY
  const { artistId } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    if (artistId) toggleGlobalLoading(false)
  }, [artistId, toggleGlobalLoading])

  // GET CURRENT VIEW
  const { currentView, setIsAnimatingView } = React.useContext(TargetingContext)

  return (
    <>
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
      {/* MOBILE PROGRESS BUTTON */}
      <TargetingProgressButton />
    </>
  )
}

// TargetingContent.propTypes = {

// }

export default TargetingContent
