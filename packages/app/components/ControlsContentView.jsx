import React from 'react'
import PropTypes from 'prop-types'

import ConversionsContent from '@/app/ConversionsContent'

const ControlsComponent = {
  targeting: <h2>Targeting</h2>,
  links: <h2>Link bank</h2>,
  integrations: <h2>Integrations</h2>,
  ads: <h2>Ad Defaults</h2>,
  conversions: <ConversionsContent />,
}

const ControlsContentView = ({ activeSlug, className }) => {
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
