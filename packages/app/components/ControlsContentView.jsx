import React from 'react'
import PropTypes from 'prop-types'

import ControlsTargeting from '@/app/ControlsTargeting'
import ControlsConversions from '@/app/ControlsConversions'

import { InterfaceContext } from '@/contexts/InterfaceContext'

const ControlsComponent = {
  targeting: <ControlsTargeting />,
  links: <h2>Links</h2>,
  integrations: <h2>Integrations</h2>,
  ads: <h2>Ads</h2>,
  conversions: <ControlsConversions />,
}

const ControlsContentView = ({ activeSlug, className }) => {
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  // TURN OFF GLOBAL LOADING
  React.useEffect(() => {
    toggleGlobalLoading(false)
  }, [toggleGlobalLoading, activeSlug])

  return (
    <div className={className}>
      {ControlsComponent[activeSlug]}
    </div>
  )
}

ControlsContentView.propTypes = {
  activeSlug: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ControlsContentView.defaultProps = {
  className: '',
}

export default ControlsContentView
