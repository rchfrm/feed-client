import React from 'react'
import PropTypes from 'prop-types'

import ControlsAll from '@/app/ControlsAll'

import { TargetingContextProvider } from '@/app/contexts/TargetingContext'

const ControlsContent = ({ activeSlug }) => {
  return (
    <TargetingContextProvider>
      <ControlsAll activeSlug={activeSlug} />
    </TargetingContextProvider>
  )
}

ControlsContent.propTypes = {
  activeSlug: PropTypes.string,
}

ControlsContent.defaultProps = {
  activeSlug: '',
}

export default ControlsContent
