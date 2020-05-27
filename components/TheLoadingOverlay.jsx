import React from 'react'

import Div100vh from 'react-div-100vh'

import { InterfaceContext } from './contexts/InterfaceContext'

import Spinner from './elements/Spinner'
import FadeInOut from './elements/FadeInOut'


const TheLoadingOverlay = () => {
  // Get interface context
  const {
    setGlobalLoading,
    globalLoading,
    showSpinner,
  } = React.useContext(InterfaceContext)
  // If loading lasts more than 300ms show the spinner
  React.useEffect(() => {
    if (!globalLoading) return
    // Only show spinner if loading page takes longer than 300ms
    const waitForLoad = setTimeout(() => {
      setGlobalLoading(true, true)
    }, 500)
    return () => {
      clearTimeout(waitForLoad)
    }
  }, [globalLoading])
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
      <Div100vh id="TheLoadingOverlay" className="fixed top-0 left-0 z-20 flex items-center justify-center w-full bg-white opacity-0">
        <Spinner className={['transition', 'ease-in', 'duration-300', 'transition-opacity', spinnerClass].join(' ')} />
      </Div100vh>
    </FadeInOut>
  )
}

export default TheLoadingOverlay
