import React from 'react'

import Div100vh from 'react-div-100vh'

import { InterfaceContext } from './contexts/InterfaceContext'

import FadeInOut from './FadeInOut'

import Spinner from './elements/Spinner'

const TheLoadingOverlay = () => {
  // Get interface context
  const { globalLoading } = React.useContext(InterfaceContext)
  if (!globalLoading) return null
  return (
    <Div100vh className="fixed top-0 left-0 z-10 flex items-center justify-center w-full bg-white">
      <Spinner />
    </Div100vh>
  )
}

export default FadeInOut(TheLoadingOverlay)
