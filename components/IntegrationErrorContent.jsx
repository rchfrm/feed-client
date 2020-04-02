import React from 'react'
import PropTypes from 'prop-types'

import helper from './helpers/helper'
import firebase from './helpers/firebase'

import MarkdownText from './elements/MarkdownText'
import Button from './elements/Button'
import ButtonFacebook from './elements/ButtonFacebook'
import Alert from './elements/Alert'

const IntegrationErrorContent = ({ integrationError, dismiss }) => {
  const {
    message,
    action,
    buttonText,
    href,
  } = integrationError
  // Build alert content
  const AlertContents = <MarkdownText markdown={message} />
  // Build alert button
  const AlertButton = () => {
    // HANDLE LINK ACTION
    if (action === 'link') {
      const linkType = helper.getLinkType(href)
      const target = linkType === 'external' ? '_blank' : 'self'
      const rel = linkType === 'external' ? 'noopener noreferrer' : ''
      return (
        <a className="button  button--black  button--full" onClick={dismiss} href={href} target={target} rel={rel}>
          {buttonText}
        </a>
      )
    }
    // HANDLE REAUTH ACTION
    if (action === 'fb_reauth') {
      const { missingPermissions } = integrationError
      const onClick = () => {
        firebase.reauthFacebook(missingPermissions)
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
      contents={AlertContents}
      resetAlert={dismiss}
    />
  )
}

IntegrationErrorContent.propTypes = {
  integrationError: PropTypes.object.isRequired,
  dismiss: PropTypes.func.isRequired,
}

export default IntegrationErrorContent
