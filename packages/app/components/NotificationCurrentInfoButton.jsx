import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const NotificationCurrentInfoButton = ({
  sidepanelLayout,
  ctaText,
  onAction,
  onComplete,
}) => {
  const [loading, setLoading] = React.useState(false)
  const onClick = React.useMemo(() => {
    return async () => {
      setLoading(true)
      const { error } = await onAction()
      setLoading(false)
      // Update notification as resolved
      if (!error) {
        onComplete()
      }
    }
  }, [onAction, onComplete])
  return (
    <Button
      className={!sidepanelLayout ? 'w-full absolute left-0 bottom-0 rounded-t-none' : null}
      version="green"
      loading={loading}
      onClick={onClick}
    >
      {ctaText}
    </Button>
  )
}

NotificationCurrentInfoButton.propTypes = {
  sidepanelLayout: PropTypes.bool.isRequired,
  ctaText: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
}

export default NotificationCurrentInfoButton
