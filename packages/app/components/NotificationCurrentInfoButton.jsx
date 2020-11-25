import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const NotificationCurrentInfoButton = ({
  sidepanelLayout,
  ctaText,
  onClick,
}) => {
  return (
    <Button
      className={!sidepanelLayout ? 'w-full absolute left-0 bottom-0 rounded-t-none' : null}
      version="green"
      onClick={onClick}
    >
      {ctaText}
    </Button>
  )
}

NotificationCurrentInfoButton.propTypes = {
  sidepanelLayout: PropTypes.bool.isRequired,
  ctaText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default NotificationCurrentInfoButton
