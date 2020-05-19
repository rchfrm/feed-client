import React from 'react'

import Div100vh from 'react-div-100vh'

import { InterfaceContext } from './contexts/InterfaceContext'

import FadeInOut from './FadeInOut'

import Spinner from './elements/Spinner'

const TheLoadingOverlay = () => {
  // Get interface context
  const { setGlobalLoading, globalLoading, showSpinner } = React.useContext(InterfaceContext)
  // If loading lasts more than 300ms show the spinner
  React.useEffect(() => {
    if (!globalLoading) return
    // Only show spinner if loading page takes longer than 300ms
    const waitForLoad = setTimeout(() => {
      setGlobalLoading(true, true)
    }, 250)
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

  if (!globalLoading) return null

  return (
    <Div100vh className="fixed top-0 left-0 z-10 flex items-center justify-center w-full bg-white">
      <Spinner className={['transition', 'ease-in', 'duration-300', 'transition-opacity', spinnerClass].join(' ')} />
    </Div100vh>
  )
}

export default FadeInOut(TheLoadingOverlay)
