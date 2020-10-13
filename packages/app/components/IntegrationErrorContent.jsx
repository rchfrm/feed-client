import React from 'react'
import PropTypes from 'prop-types'

import firebase from '@/helpers/firebase'

import { AuthContext } from '@/contexts/AuthContext'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import useAlertModal from '@/hooks/useAlertModal'

const IntegrationErrorContent = ({ integrationError, dismiss, networkError, showError }) => {
  // IMPORT AUTH AND AUTH ERROR
  const { auth, authError } = React.useContext(AuthContext)

  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()

  // BUILD ALERT CONTENT
  const alertContents = React.useMemo(() => {
    const { message } = integrationError
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
    // Get values from integration error
    const {
      action,
      buttonText,
      href,
      fbLink,
    } = integrationError
    // Link button
    if (action === 'link') {
      const facebookButton = fbLink
      return [
        {
          text: buttonText,
          onClick: () => {},
          color: 'green',
          href,
          facebookButton,
        },
        {
          text: 'Cancel',
          onClick: () => {
            closeAlert()
            dismiss()
          },
          color: 'black',
        },
      ]
    }
    // Reauth button
    if (action === 'fb_reauth') {
      const { missingPermissions } = integrationError
      const onClick = () => {
        const { providerIds } = auth
        // Which facebook function
        if (providerIds.includes('facebook.com')) {
          firebase.reauthFacebook(missingPermissions)
        } else {
          firebase.linkFacebookAccount()
        }
      }
      return [{
        text: buttonText,
        onClick,
        facebookButton: true,
      }]
    }
    // Default
    return [{
      text: buttonText || 'Ok',
      onClick: () => {
        closeAlert()
        dismiss()
      },
      color: 'black',
    }]
  }, [closeAlert, dismiss, integrationError, auth])

  React.useEffect(() => {
    if (showError) {
      showAlert({ children: alertContents, buttons: alertButtons })
    }
  }, [showError, alertContents, alertButtons, showAlert])

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
