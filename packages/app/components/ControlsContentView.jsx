import React from 'react'
import PropTypes from 'prop-types'

import ControlsConversions from '@/app/ControlsConversions'

import { InterfaceContext } from '@/contexts/InterfaceContext'

const ControlsComponent = {
  targeting: <h2>Targeting</h2>,
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
  }, [activeSlug, toggleGlobalLoading])

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
