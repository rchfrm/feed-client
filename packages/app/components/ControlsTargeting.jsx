import React from 'react'
// import PropTypes from 'prop-types'

import TargetingContent from '@/app/TargetingContent'

import { TargetingContextProvider } from '@/app/contexts/TargetingContext'

const ControlsTargeting = () => {
  return (
    <TargetingContextProvider>
      <TargetingContent />
    </TargetingContextProvider>
  )
}

ControlsTargeting.propTypes = {

}

export default ControlsTargeting
