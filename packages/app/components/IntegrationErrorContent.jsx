import React from 'react'
import PropTypes from 'prop-types'

import { requestVerificationEmail } from '@/app/helpers/appServer'
import { handleFbAuthRedirect } from '@/app/helpers/facebookHelpers'

import { AuthContext } from '@/contexts/AuthContext'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import useAlertModal from '@/hooks/useAlertModal'
import Router, { useRouter } from 'next/router'

import * as ROUTES from '@/app/constants/routes'

const IntegrationErrorContent = ({ integrationError, dismiss, networkError, showError }) => {
  const { auth, authError } = React.useContext(AuthContext)
  const { showAlert, closeAlert } = useAlertModal()
  const router = useRouter()

  const alertContents = React.useMemo(() => {
    const { description: message } = integrationError
    return (
      <>
        <Error error={authError || networkError} />
        {message && (
          <MarkdownText markdown={message} />
        )}
      </>
    )
  }, [integrationError, authError, networkError])

  const alertButtons = React.useMemo(() => {
    const {
      ctaType,
      buttonType,
      ctaText,
      ctaLink,
      isDismissible,
      onAction,
    } = integrationError
    // Link button
    if (ctaType === 'link_ext') {
      const isFacebookButton = buttonType === 'facebook'
      return [
        {
          text: ctaText,
          onClick: () => {},
          href: ctaLink,
          isFacebookButton,
        },
        {
          text: 'Cancel',
          onClick: closeAlert,
          version: 'secondary',
        },
      ]
    }
    // Reauth button
    if (ctaType === 'fb_reauth') {
      const { data: { required_scope: requiredScope = [] } } = integrationError
      const onClick = () => {
        handleFbAuthRedirect(auth, requiredScope, router.pathname)
      }

      return [{
        text: ctaText,
        onClick,
        isFacebookButton: true,
      }]
    }
    // Edit email and email confirmation buttons
    if (ctaType === 'email_confirmation') {
      const { emailType } = integrationError

      const resendConfirmationLink = async () => {
        await requestVerificationEmail(emailType)
      }
      const goToConfirmEmailPage = () => {
        Router.push(`${ROUTES.CONFIRM_EMAIL}/?type=${emailType}&isEdit=true`)
        closeAlert()
      }
      return [
        {
          text: ctaText,
          onClick: goToConfirmEmailPage,
        },
        {
          text: 'Resend link',
          onClick: resendConfirmationLink,
          version: 'secondary',
        },
      ]
    }
    if (ctaType === 'link_int' && isDismissible) {
      return [
        {
          text: ctaText,
          onClick: onAction,
        },
        {
          text: 'Dismiss',
          onClick: () => {},
          version: 'secondary',
        },
      ]
    }
    // Default
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
      })
    }
  }, [showError, alertContents, alertButtons, showAlert, closeAlert, dismiss, auth.token])

  return null
}

IntegrationErrorContent.propTypes = {
  integrationError: PropTypes.object,
  dismiss: PropTypes.func.isRequired,
  networkError: PropTypes.object,
  showError: PropTypes.bool.isRequired,
}

IntegrationErrorContent.defaultProps = {
  integrationError: {},
  networkError: null,
}


export default IntegrationErrorContent
