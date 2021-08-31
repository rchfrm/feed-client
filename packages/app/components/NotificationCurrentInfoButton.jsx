import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import ButtonFacebook from '@/elements/ButtonFacebook'

const NotificationCurrentInfoButton = ({
  sidepanelLayout,
  ctaText,
  buttonType,
  linkType,
  isActionable,
  isComplete,
  onAction,
  onComplete,
  dismissNotification,
}) => {
  const [loading, setLoading] = React.useState(false)

  const onClick = React.useCallback(async () => {
    if (!isActionable || (isActionable && isComplete)) {
      dismissNotification()
      return
    }
    setLoading(true)
    const { res, error } = await onAction() || {}
    // Stop here if navigating to new page
    if (linkType === 'internal') return
    setLoading(false)
    // Don't complete
    if (error || res === 'incomplete') return
    // Update notification as resolved
    onComplete()
  }, [linkType, isActionable, isComplete, onAction, onComplete, dismissNotification])

  if (buttonType === 'facebook') {
    return (
      <ButtonFacebook
        className={!sidepanelLayout ? 'w-full absolute left-0 bottom-0 rounded-t-none' : null}
        loading={loading}
        onClick={onClick}
        fallbackCta={ctaText}
      >
        {ctaText}
      </ButtonFacebook>
    )
  }

  return (
    <Button
      className={!sidepanelLayout ? 'w-full absolute left-0 bottom-0 rounded-t-none' : null}
      version="green"
      loading={loading}
      onClick={onClick}
    >
      {isActionable ? ctaText : 'Dismiss'}
    </Button>
  )
}

NotificationCurrentInfoButton.propTypes = {
  sidepanelLayout: PropTypes.bool.isRequired,
  ctaText: PropTypes.string,
  buttonType: PropTypes.string.isRequired,
  linkType: PropTypes.string,
  isComplete: PropTypes.bool.isRequired,
  onAction: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  dismissNotification: PropTypes.func.isRequired,
}

NotificationCurrentInfoButton.defaultProps = {
  linkType: null,
}


export default NotificationCurrentInfoButton
