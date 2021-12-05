import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import ButtonFacebook from '@/elements/ButtonFacebook'

const NotificationCurrentInfoButton = ({
  sidepanelLayout,
  ctaText,
  ctaLink,
  actionType,
  buttonType,
  isActionable,
  isComplete,
  isDismissible,
  onAction,
  onComplete,
  dismissNotification,
}) => {
  const [loading, setLoading] = React.useState(false)

  // Notifications should be either dismissible, dismissible with CTA or actionable, but never dismissible and actionable.
  // Once an actionable notification is complete, it can be dismissed.
  const canDismiss = (isActionable && isComplete) || isDismissible
  const isFacebookButton = buttonType === 'facebook' && !isComplete

  const onClick = React.useCallback(async () => {
    if (canDismiss && !ctaLink) {
      dismissNotification()
      return
    }
    setLoading(true)
    const { res, error } = await onAction() || {}
    // Stop here if navigating to new page
    if (actionType === 'link_int') return
    setLoading(false)
    // Don't complete
    if (error || res === 'incomplete') return
    // Update notification as resolved
    onComplete()
  }, [actionType, ctaLink, canDismiss, onAction, onComplete, dismissNotification])

  const NotificationButton = isFacebookButton ? ButtonFacebook : Button

  return (
    <div className="mt-auto">
      {isDismissible && ctaLink ? (
        <NotificationButton
          className={!sidepanelLayout ? 'w-full rounded-none' : null}
          version={isFacebookButton ? null : 'black'}
          loading={loading}
          onClick={onClick}
          fallbackCta={isFacebookButton ? ctaText : null}
          trackComponentName="NotificationCurrentInfoButton"
        >
          {ctaText}
        </NotificationButton>
      ) : null}

      <NotificationButton
        className={!sidepanelLayout ? 'w-full rounded-t-none' : null}
        version={isFacebookButton ? null : 'green'}
        loading={canDismiss ? false : loading}
        onClick={canDismiss ? dismissNotification : onClick}
        fallbackCta={isFacebookButton ? ctaText : null}
        trackComponentName="NotificationCurrentInfoButton"
      >
        {canDismiss ? 'Dismiss' : ctaText}
      </NotificationButton>
    </div>
  )
}

NotificationCurrentInfoButton.propTypes = {
  sidepanelLayout: PropTypes.bool.isRequired,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  actionType: PropTypes.string,
  buttonType: PropTypes.string.isRequired,
  isActionable: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onAction: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  dismissNotification: PropTypes.func.isRequired,
}

NotificationCurrentInfoButton.defaultProps = {
  actionType: null,
  ctaText: null,
  ctaLink: null,
}


export default NotificationCurrentInfoButton
