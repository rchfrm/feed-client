import React from 'react'

import { InterfaceContext } from '@/app/contexts/InterfaceContext'

import FullHeight from '@/elements/FullHeight'
import Spinner from '@/elements/Spinner'
import FadeInOut from '@/elements/FadeInOut'


const TheLoadingOverlay = () => {
  // Get interface context
  const {
    toggleGlobalLoading,
    toggleGlobalLoadingSpinner,
    globalLoading,
    showSpinner,
  } = React.useContext(InterfaceContext)
  // If loading lasts more than 300ms show the spinner
  React.useEffect(() => {
    if (! globalLoading) return
    // Only show spinner if loading page takes longer than 300ms
    const waitForLoad = setTimeout(() => {
      toggleGlobalLoadingSpinner(true)
    }, 500)
    return () => {
      clearTimeout(waitForLoad)
    }
  }, [globalLoading, toggleGlobalLoading, toggleGlobalLoadingSpinner])
  // Toggle spinner visibility
  const [spinnerClass, setSpinnerClass] = React.useState('')
  React.useEffect(() => {
    const spinnerClass = showSpinner ? 'opacity-100' : 'opacity-0'
    setSpinnerClass(spinnerClass)
  }, [showSpinner])

  // VISIBLE STATE
  const [show, setShow] = React.useState(true)
  const [isAnimating, setIsAnimating] = React.useState(false)
  React.useEffect(() => {
    if (isAnimating) return
    setShow(globalLoading)
  }, [globalLoading, isAnimating])

  return (
    <FadeInOut
      show={show}
      onEnter={() => setIsAnimating(true)}
      onExit={() => setIsAnimating(true)}
      addEndListener={() => setIsAnimating(false)}
      unmountOnExit
    >
      <FullHeight id="TheLoadingOverlay" className="fixed top-0 left-0 z-20 flex items-center justify-center w-full bg-offwhite opacity-0">
        <Spinner className={['transition', 'ease-in', 'duration-300', 'transition-opacity', spinnerClass].join(' ')} />
      </FullHeight>
    </FadeInOut>
  )
}

export default TheLoadingOverlay
