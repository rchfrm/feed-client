import React from 'react'
import PropTypes from 'prop-types'
import ButtonNew from '@/elements/ButtonNew'
import ButtonFacebook from '@/elements/ButtonFacebook'

const NotificationCurrentInfoButton = ({
  ctaText,
  ctaLink,
  ctaType,
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
  const isFacebookButton = buttonType === 'facebook' && ! isComplete

  const onClick = React.useCallback(async () => {
    setLoading(true)
    const { res, error } = await onAction() || {}
    // Stop here if navigating to new page
    if (ctaType === 'link_int') return
    setLoading(false)
    // Don't complete
    if (error || res === 'incomplete') return
    // Update notification as resolved
    onComplete()
  }, [ctaType, onAction, onComplete])

  const ButtonType = isFacebookButton ? ButtonFacebook : ButtonNew

  return (
    <div className="mt-auto">
      {(isActionable && ! isComplete) || (isDismissible && ctaLink) ? (
        <ButtonType
          className="w-full rounded-none"
          version={isFacebookButton ? null : 'primary'}
          isLoading={loading}
          onClick={onClick}
          trackComponentName="NotificationCurrentInfoButton"
        >
          {ctaText}
        </ButtonType>
      ) : null}

      {canDismiss && (
        <ButtonNew
          version="tertiary"
          className="w-full rounded-t-none"
          onClick={dismissNotification}
          trackComponentName="NotificationCurrentInfoButton"
        >
          Dismiss
        </ButtonNew>
      )}
    </div>
  )
}

NotificationCurrentInfoButton.propTypes = {
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  ctaType: PropTypes.string,
  buttonType: PropTypes.string.isRequired,
  isActionable: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onAction: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  dismissNotification: PropTypes.func.isRequired,
}

NotificationCurrentInfoButton.defaultProps = {
  ctaType: null,
  ctaText: null,
  ctaLink: null,
}

export default NotificationCurrentInfoButton
