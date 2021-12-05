import React from 'react'
import PropTypes from 'prop-types'

import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { requestVerificationEmail } from '@/app/helpers/appServer'

import { AuthContext } from '@/contexts/AuthContext'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import useAlertModal from '@/hooks/useAlertModal'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

const IntegrationErrorContent = ({ integrationError, dismiss, networkError, showError }) => {
  const { auth, authError } = React.useContext(AuthContext)
  const { showAlert, closeAlert } = useAlertModal()

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
      actionType,
      buttonType,
      ctaText,
      ctaLink,
    } = integrationError
    // Link button
    if (actionType === 'link_ext') {
      const facebookButton = buttonType === 'facebook'
      return [
        {
          text: ctaText,
          onClick: () => {},
          color: facebookButton ? 'facebook' : 'green',
          href: ctaLink,
          facebookButton,
        },
        {
          text: 'Cancel',
          onClick: closeAlert,
          color: 'black',
        },
      ]
    }
    // Reauth button
    if (actionType === 'fb_reauth') {
      const { missingPermissions } = integrationError
      const onClick = () => {
        const { providerIds } = auth
        // Which facebook function
        if (providerIds.includes('facebook.com')) {
          firebaseHelpers.reauthFacebook(missingPermissions)
        } else {
          firebaseHelpers.linkFacebookAccount()
        }
      }
      return [{
        text: ctaText,
        onClick,
        facebookButton: true,
      }]
    }
    // Edit email and email confirmation buttons
    if (actionType === 'email_confirmation') {
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
          color: 'green',
        },
        {
          text: 'Resend link',
          onClick: resendConfirmationLink,
          color: 'black',
        },
      ]
    }
    // Default
    return [{
      text: ctaText || 'Ok',
      onClick: closeAlert,
      color: 'black',
    }]
  }, [closeAlert, integrationError, auth])

  React.useEffect(() => {
    if (!auth.token) {
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
