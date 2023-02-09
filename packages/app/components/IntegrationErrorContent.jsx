import React from 'react'
import PropTypes from 'prop-types'
import { handleFbAuthRedirect } from '@/app/helpers/facebookHelpers'
import { AuthContext } from '@/contexts/AuthContext'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'
import useAlertModal from '@/hooks/useAlertModal'
import { useRouter } from 'next/router'

const IntegrationErrorContent = ({
  integrationError,
  dismiss,
  showError,
}) => {
  const { auth, authError } = React.useContext(AuthContext)
  const { showAlert, closeAlert } = useAlertModal()
  const router = useRouter()

  const alertContents = React.useMemo(() => {
    const { description: message } = integrationError
    return (
      <>
        <Error error={authError} />
        {message && (
          <MarkdownText markdown={message} />
        )}
      </>
    )
  }, [integrationError, authError])

  const alertButtons = React.useMemo(() => {
    const {
      ctaType,
      ctaText,
      ctaLink,
      isDismissible,
      onAction,
    } = integrationError

    if (ctaType === 'link_ext') {
      return [
        {
          text: 'Cancel',
          onClick: closeAlert,
          version: 'secondary',
        },
        {
          text: ctaText,
          onClick: () => {},
          href: ctaLink,
        },
      ]
    }

    if (ctaType === 'fb_reauth') {
      const { data: { required_scope: requiredScope = [] } } = integrationError
      const onClick = () => {
        handleFbAuthRedirect(auth, requiredScope, router.pathname)
      }

      return [{
        text: ctaText,
        onClick,
      }]
    }

    if (ctaType === 'link_int' && isDismissible) {
      return [
        {
          text: 'Dismiss',
          onClick: () => {},
          version: 'secondary',
        },
        {
          text: ctaText,
          onClick: onAction,
        },
      ]
    }

    return [{
      text: ctaText || 'Ok',
      onClick: closeAlert,
    }]
  }, [closeAlert, integrationError, auth, router.pathname])

  React.useEffect(() => {
    if (! auth.token) {
      closeAlert()
      return
    }

    if (showError) {
      showAlert({
        children: alertContents,
        buttons: alertButtons,
        onClose: dismiss,
        isIntegrationError: true,
      })
    }
  }, [showError, alertContents, alertButtons, showAlert, closeAlert, dismiss, auth.token])

  return null
}

IntegrationErrorContent.propTypes = {
  integrationError: PropTypes.object,
  dismiss: PropTypes.func.isRequired,
  showError: PropTypes.bool.isRequired,
}

IntegrationErrorContent.defaultProps = {
  integrationError: {},
}

export default IntegrationErrorContent
