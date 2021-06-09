import React from 'react'
import PropTypes from 'prop-types'

import ControlsTargeting from '@/app/ControlsTargeting'

import { InterfaceContext } from '@/contexts/InterfaceContext'

const SettingsComponent = {
  targeting: <ControlsTargeting />,
  links: <h2>Links</h2>,
  integrations: <h2>Integrations</h2>,
  ads: <h2>Ads</h2>,
  conversions: <h2>Conversions</h2>,
}

const ControlsSettingsLoader = ({ activeSlug, className }) => {
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  // TURN OFF GLOBAL LOADING
  React.useEffect(() => {
    toggleGlobalLoading(false)
  }, [toggleGlobalLoading, activeSlug])

  return (
    <div className={className}>
      {SettingsComponent[activeSlug]}
    </div>
  )
}

ControlsSettingsLoader.propTypes = {
  activeSlug: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ControlsSettingsLoader.defaultProps = {
  className: '',
}

export default ControlsSettingsLoader
