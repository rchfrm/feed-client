import React from 'react'
import PropTypes from 'prop-types'

import firebase from '@/helpers/firebase'

import { AuthContext } from '@/app/contexts/Auth'

import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import ButtonFacebook from '@/elements/ButtonFacebook'
import Alert from '@/elements/Alert'
import Error from '@/elements/Error'

const IntegrationErrorContent = ({ integrationError, dismiss }) => {
  const {
    message,
    action,
    buttonText,
    href,
    fbLink,
  } = integrationError
  // Import auth and auth error
  const { auth, authError } = React.useContext(AuthContext)
  // Build alert content
  const getAlertContents = () => {
    return (
      <>
        <Error error={authError} />
        <MarkdownText markdown={message} />
      </>
    )
  }

  // Build alert button
  const AlertButton = () => {
    // HANDLE LINK ACTION
    if (action === 'link') {
      const ButtonType = fbLink ? ButtonFacebook : Button
      const buttonVersion = fbLink ? 'full' : 'black full'
      return (
        <ButtonType
          version={buttonVersion}
          onClick={dismiss}
          href={href}
        >
          {buttonText}
        </ButtonType>
      )
    }
    // HANDLE REAUTH ACTION
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
      return (
        <ButtonFacebook version="full" onClick={onClick}>{buttonText}</ButtonFacebook>
      )
    }
    // HANDLE DISMISS ACTION
    if (action === 'dismiss') {
      return (
        <Button version="black full" onClick={dismiss}>{buttonText}</Button>
      )
    }
  }

  return (
    <Alert
      buttons={<AlertButton />}
      contents={getAlertContents()}
      resetAlert={dismiss}
    />
  )
}

IntegrationErrorContent.propTypes = {
  integrationError: PropTypes.object.isRequired,
  dismiss: PropTypes.func.isRequired,
}

export default IntegrationErrorContent
